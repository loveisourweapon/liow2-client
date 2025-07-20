import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { has, findIndex, findLast } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/if';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';

import { Campaign, Deed, FeedCriteria, Group, GroupSlug, JsonPatchOp, User } from '../core/models';
import {
  ActService,
  AlertifyService,
  AuthService,
  CampaignService,
  GroupService,
  ModalService,
  StateService,
  TitleService,
  UserService,
} from '../core/services';
import { identifyBy } from '../shared';
import { GroupTab } from './group-tab.model';

@Component({
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnDestroy, OnInit {
  feedCriteria: FeedCriteria;
  currentTab: GroupTab;
  tabs = GroupTab;

  identifyBy = identifyBy;

  private routeSubscription: Subscription;
  private groupSubscription: Subscription;
  private campaignSubscription: Subscription;
  private userSubscription: Subscription;
  private feedCriteriaSubscription: Subscription;

  @ViewChild('confirmModal') confirmModal: ModalDirective;
  confirmModalContent: string;
  private confirmation$ = new BehaviorSubject<boolean>(null);

  constructor(
    private actService: ActService,
    private alertify: AlertifyService,
    public auth: AuthService,
    private campaignService: CampaignService,
    private groupService: GroupService,
    public modal: ModalService,
    private route: ActivatedRoute,
    public state: StateService,
    private title: TitleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params
      .filter((params: Params) => has(params, 'groupSlug'))
      .map((params: Params) => params.groupSlug)
      .distinctUntilChanged()
      .do(() => (this.state.group = null))
      .switchMap((groupSlug: GroupSlug) => this.groupService.findOne({ urlName: groupSlug }))
      .subscribe((group: Group) => (this.state.group = group));

    this.groupSubscription = this.state.group$
      .filter((group: Group) => group !== null)
      .subscribe((group: Group) => {
        this.actService.count({ group: group._id });
        this.title.set(group.name);
      });

    this.campaignSubscription = this.state.campaign$
      .filter((campaign: Campaign) => campaign !== null)
      .subscribe((campaign: Campaign) => this.actService.count({ campaign: campaign._id }));

    this.userSubscription = this.state.group$
      .switchMap((group: Group) =>
        Observable.combineLatest(
          this.auth.isMemberOfGroup(group),
          this.state.auth.user$,
          this.state.group$
        )
      )
      .distinctUntilChanged()
      .subscribe(([isMemberOfGroup, authUser, group]: [boolean, User, Group]) => {
        this.currentTab = isMemberOfGroup ? GroupTab.Feed : GroupTab.Welcome;
        if (isMemberOfGroup && authUser && group) {
          this.auth.setAuthGroup(group);
        }
      });

    this.feedCriteriaSubscription = Observable.combineLatest(
      this.state.group$,
      this.state.campaign$
    )
      .filter(([group, campaign]: [Group, Campaign]) => group !== null)
      .subscribe(([group, campaign]: [Group, Campaign]) => {
        this.feedCriteria = campaign ? { campaign: campaign._id } : { group: group._id };
      });
  }

  ngOnDestroy(): void {
    this.state.group = null;

    this.routeSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
    this.campaignSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.feedCriteriaSubscription.unsubscribe();
  }

  isCurrentDeed(deed: Deed, campaign: Campaign): boolean {
    if (!(campaign && campaign.deeds)) {
      return false;
    }

    const currentDeed = findLast(campaign.deeds, { published: true });
    if (!currentDeed) {
      return false;
    }

    return currentDeed.deed['_id'] === deed._id;
  }

  joinGroup(user$: Observable<User>, group$: Observable<Group>): void {
    // TODO: investigate better way than hoisting these variables out of their closures
    let user: User, group: Group;

    Observable.combineLatest(user$, group$)
      .first()
      .do(([authUser, currentGroup]: [User, Group]) => {
        user = authUser;
        group = currentGroup;
      })
      .switchMap(([authUser, currentGroup]: [User, Group]) =>
        this.userService.update(authUser, [
          {
            op: JsonPatchOp.Add,
            path: `/groups/${authUser.groups.length}`,
            value: currentGroup._id,
          },
        ])
      )
      .switchMap(() => this.auth.loadCurrentUser())
      .do(() => this.auth.setAuthGroup(group))
      .subscribe(
        () => this.alertify.success(`Joined group <b>${group.name}</b>`),
        () => this.alertify.error(`Failed joining group <b>${group.name}</b>`)
      );
  }

  leaveGroup(user$: Observable<User>, group$: Observable<Group>): void {
    group$
      .first()
      .switchMap((group: Group) =>
        Observable.combineLatest(user$, group$, this.auth.isAdminOfGroup(group))
      )
      .first()
      .switchMap(([user, group, isAdminOfGroup]: [User, Group, boolean]) =>
        Observable.if(
          // Prevent group owner and group admins from leaving
          () => group.owner !== user._id && !isAdminOfGroup,
          Observable.of([user, group]),
          Observable.throw(
            group.owner === user._id
              ? // User is the group owner
                `
            <p>You are the current owner of <b>${group.name}</b>.</p>
            <p>You'll need to make someone else the owner before leaving.</p>
          `
              : // User is a group admin
                `
            <p>You are currently an admin of <b>${group.name}</b>.</p>
            <p>You'll need to be removed as an admin before leaving.</p>
          `
          )
        )
      )
      .subscribe(
        ([user, group]: [User, Group]) => {
          this.openConfirmation(`Are you sure you want to leave <b>${group.name}</b>?`);
          this.confirmation$
            .skip(1)
            .filter((isConfirmed: boolean) => isConfirmed)
            .map(() => user.groups.findIndex((userGroup: Group) => userGroup._id === group._id))
            .switchMap((index: number) =>
              this.userService.update(user, [
                {
                  op: JsonPatchOp.Remove,
                  path: `/groups/${index}`,
                },
              ])
            )
            .switchMap(() => this.auth.loadCurrentUser())
            .subscribe(
              () => this.alertify.log(`Left group <b>${group.name}</b>`),
              () => this.alertify.error(`Failed leaving group <b>${group.name}</b>`)
            );
        },
        (errorMessage: string) => this.alertify.log(errorMessage, 10000, false)
      );
  }

  finishCampaign(campaign: Campaign): void {
    this.openConfirmation(`Are you sure you want to finish the current campaign?`);
    this.confirmation$
      .filter((isConfirmed: boolean) => isConfirmed !== null)
      .first()
      .filter((isConfirmed: boolean) => isConfirmed)
      .switchMap(() =>
        this.campaignService.update(campaign, [
          {
            op: JsonPatchOp.Replace,
            path: `/active`,
            value: false,
          },
          {
            op: JsonPatchOp.Replace,
            path: `/dateEnd`,
            value: new Date(),
          },
        ])
      )
      .do(() => (this.state.campaign = null))
      .subscribe(
        () => this.alertify.success(`Finished campaign`),
        () => this.alertify.error(`Failed finishing campaign`)
      );
  }

  setArchived(group: Group, isArchived: boolean): void {
    this.groupService
      .update(group, [
        {
          op: JsonPatchOp.Replace,
          path: `/archived`,
          value: isArchived,
        },
      ])
      .switchMap(() => this.groupService.findOne({ _id: group._id }))
      .do((updatedGroup: Group) => (this.state.group = updatedGroup))
      .subscribe(
        () =>
          this.alertify.success(
            `${isArchived ? `Archived` : `Unarchived`} group <b>${group.name}</b>`
          ),
        () => this.alertify.error(`Failed ${isArchived ? `archiving` : `unarchiving`} group`)
      );
  }

  setPublished(deed: Deed, campaign: Campaign, isPublished: boolean): void {
    const deedIndex = findIndex(campaign.deeds, { deed: { _id: deed._id } });
    const patch = {
      op: JsonPatchOp.Replace,
      path: `/deeds/${deedIndex}/published`,
      value: isPublished,
    };
    const action = isPublished ? `Publish` : `Unpublish`;
    const alertMethod = isPublished ? `success` : `log`;

    this.campaignService
      .update(campaign, [patch])
      .switchMap(() => this.campaignService.findOne({ group: campaign.group, active: true }))
      .do((foundCampaign: Campaign) => {
        this.state.campaign = foundCampaign;
        this.actService.count({ campaign: foundCampaign._id });
      })
      .subscribe(
        () => this.alertify[alertMethod](`${action}ed deed <b>${deed.title}</b>`),
        () => this.alertify.error(`Failed ${action}ing deed <b>${deed.title}</b>`)
      );
  }

  openConfirmation(confirmModalContent: string): void {
    this.confirmation$.next(null);
    this.confirmModalContent = confirmModalContent;
    this.confirmModal.show();
  }

  closeConfirmation(isConfirmed: boolean): void {
    this.confirmation$.next(isConfirmed);
    this.confirmModal.hide();
  }
}
