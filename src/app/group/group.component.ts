import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { search } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { has, findLast, some } from 'lodash';

import { TitleService } from '../core';
import * as alertify from '../store/alertify/alertify.actions';
import { Campaign, DeedPublish, Group, GroupSlug, GroupTab } from '../store/group';
import * as group from '../store/group/group.actions';
import { GroupEditAction } from '../store/group-edit-modal';
import { CampaignEditAction } from '../store/campaign-edit-modal';
import { User } from '../store/user';
import * as user from '../store/user/user.actions';
import * as modal from '../store/modal.actions';
import * as fromRoot from '../store/reducer';

@Component({
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnDestroy, OnInit {
  group$: Observable<Group>;
  campaign$: Observable<Campaign>;
  groupCounter$: Observable<number>;
  isAuthenticated$: Observable<boolean>;
  authUser$: Observable<User>;
  currentTab$: Observable<GroupTab>;

  tabs = GroupTab;

  private routeSubscription: Subscription;
  private groupSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.group$ = this.store.select(fromRoot.getCurrentGroup);
    this.campaign$ = this.store.select(fromRoot.getCurrentCampaign);
    this.groupCounter$ = this.store.select(fromRoot.getCurrentGroupCount);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
    this.currentTab$ = this.store.select(fromRoot.getCurrentGroupTab);

    this.routeSubscription = this.route.params
      .map((params: Params) => params['groupSlug'])
      .filter((groupSlug: GroupSlug) => Boolean(groupSlug))
      .distinctUntilChanged()
      .subscribe((groupSlug: GroupSlug) =>
        this.store.dispatch(new group.FindAndSetCurrentAction({ urlName: groupSlug })));

    this.groupSubscription = this.group$
      .filter((group: Group) => group !== null)
      .do(() => this.checkSetupCampaign())
      .subscribe((group: Group) => this.title.set(group.name));

    this.userSubscription = this.isUserAn$(this.memberOfGroup, this.authUser$, this.group$)
      .distinctUntilChanged()
      .subscribe((isMemberOfGroup: boolean) =>
        this.store.dispatch(new group.SetCurrentTabAction(isMemberOfGroup ? GroupTab.Feed : GroupTab.Welcome)));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  setCurrentTab(currentTab: GroupTab): void {
    this.store.dispatch(new group.SetCurrentTabAction(currentTab));
  }

  isUserAn$(predicate: (User, Group) => boolean, user$: Observable<User>, group$: Observable<Group>): Observable<boolean> {
    return Observable.combineLatest(user$, group$)
      .distinctUntilChanged()
      .map(([user, group]: [User, Group]) => predicate(user, group));
  }

  memberOfGroup(user: User, group: Group): boolean {
    return has(user, 'groups')
      && has(group, '_id')
      && some(user.groups, (userGroup: Group) => userGroup._id === group._id);
  }

  adminOfGroup(user: User, group: Group): boolean {
    return has(group, 'admins')
      && has(user, '_id')
      && group.admins.includes(user._id);
  }

  isCurrentDeed(item: DeedPublish): Observable<boolean> {
    return this.campaign$.take(1)
      .map((campaign: Campaign) => {
        if (!(campaign && campaign.deeds)) { return false; }

        const currentDeed = findLast(campaign.deeds,  { published: true });
        if (!currentDeed) { return false; }

        return currentDeed.deed['_id'] === item.deed['_id'];
      });
  }

  joinGroup(user$: Observable<User>, group$: Observable<Group>): void {
    Observable.combineLatest(user$, group$)
      .distinctUntilChanged()
      .first()
      .subscribe(([currentUser, group]: [User, Group]) =>
        this.store.dispatch(new user.JoinGroupAction({ user: currentUser, group })));
  }

  leaveGroup(user$: Observable<User>, group$: Observable<Group>): void {
    Observable.combineLatest(user$, group$)
      .distinctUntilChanged()
      .first()
      .flatMap(([currentUser, group]: [User, Group]) => Observable.if(
        // Prevent group owner and group admins from leaving
        () => group.owner !== currentUser._id && !this.adminOfGroup(currentUser, group),
        Observable.of([currentUser, group]),
        Observable.throw(group.owner === currentUser._id
          // User is the group owner
          ? `
            <p>You are the current owner of <b>${group.name}</b>.</p>
            <p>You'll need to make someone else the owner before leaving.</p>
          `
          // User is a group admin
          : `
            <p>You are currently an admin of <b>${group.name}</b>.</p>
            <p>You'll need to be removed as an admin before leaving.</p>
          `
        )
      ))
      .subscribe(
        ([currentUser, group]: [User, Group]) =>
          this.store.dispatch(new user.LeaveGroupAction({ user: currentUser, group })),
        (errorMessage: string) =>
          this.store.dispatch(new alertify.LogAction({
            message: errorMessage,
            timeout: 10000,
            useTemplate: false,
          })),
      );
  }

  openGroupEditModal(group$: Observable<Group>): void {
    group$.first().subscribe((group: Group) =>
      this.store.dispatch(new modal.OpenGroupEditAction({ action: GroupEditAction.Update, group })));
  }

  openCampaignEditModal(group$: Observable<Group>, campaign$: Observable<Campaign> = Observable.of(undefined)): void {
    Observable.combineLatest(group$, campaign$)
      .first()
      .subscribe(([group, campaign]: [Group, Campaign]) => {
        const action = campaign === undefined ? CampaignEditAction.Create : CampaignEditAction.Update;
        this.store.dispatch(new modal.OpenCampaignEditAction({ action, group, campaign }));
      });
  }

  finishCampaign(campaign$: Observable<Campaign>): void {
  }

  setPublished(campaign$: Observable<Campaign>, item: DeedPublish, isPublished: boolean): void {
  }

  openLoginModal(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }

  private checkSetupCampaign(): void {
    this.route.queryParams.take(1)
      .filter((queryParams: Params) => queryParams['setupCampaign'])
      .do(() => this.store.dispatch(search({})))
      .subscribe((queryParams) => this.openCampaignEditModal(this.group$));
  }
}
