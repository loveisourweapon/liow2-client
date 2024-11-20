import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/if';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';

import { Group, JsonPatchOp, User } from '../../core/models';
import {
  ActService,
  AlertifyService,
  AuthService,
  GroupService,
  ModalService,
  StateService,
  TitleService,
  UserService,
} from '../../core/services';
import { SearchParams } from '../../shared';

@Component({
  templateUrl: './group-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetailComponent implements OnInit {
  numberOfMembers$: Observable<number>;

  @ViewChild('confirmModal') confirmModal: ModalDirective;
  confirmModalContent: string;
  private confirmation$ = new BehaviorSubject<boolean>(null);

  @ViewChild('confirmRemoveModal') confirmRemoveModal: ModalDirective;
  isRemoving$ = new BehaviorSubject<boolean>(false);

  constructor(
    private actService: ActService,
    private alertify: AlertifyService,
    public auth: AuthService,
    public modal: ModalService,
    private router: Router,
    public state: StateService,
    private title: TitleService,
    private userService: UserService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.numberOfMembers$ = this.state.controlPanel.group$
      .do((group: Group) => {
        this.actService.count({ group: group._id });
        this.title.set(`${group.name} | Control Panel`);
      })
      .map((group: Group) => <SearchParams>{ groups: group._id })
      .switchMap((searchParams: SearchParams) => this.userService.count(searchParams));
  }

  leaveGroup(user: User, group: Group): void {
    this.auth
      .isAdminOfGroup(group)
      .first()
      .switchMap((isAdminOfGroup: boolean) =>
        Observable.if(
          // Prevent group owner and group admins from leaving
          () => group.owner !== user._id && !isAdminOfGroup,
          Observable.of(null),
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
        () => {
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
            .do(() => this.router.navigate(['/control-panel']))
            .subscribe(
              () => this.alertify.log(`Left group <b>${group.name}</b>`),
              () => this.alertify.error(`Failed leaving group <b>${group.name}</b>`)
            );
        },
        (errorMessage: string) => this.alertify.log(errorMessage, 10000, false)
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

  handleRemove(group: Group): void {
    this.isRemoving$.next(true);
    this.groupService
      .delete(group)
      .finally(() => this.isRemoving$.next(false))
      .subscribe(
        () => {
          this.alertify.success(`Removed group`);
          this.confirmRemoveModal.hide();
          this.auth.loadCurrentUser();
          this.router.navigate(['/control-panel/user']);
        },
        () => this.alertify.error(`Failed removing group`)
      );
  }
}
