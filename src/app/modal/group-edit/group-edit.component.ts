import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { has, keys } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { ApiError, EditAction, Group, ModalState, NewGroup, User } from '../../core/models';
import {
  AlertifyService,
  AuthService,
  GroupService,
  ModalService,
  StateService,
  UserService,
} from '../../core/services';

@Component({
  selector: 'liow-group-edit-modal',
  templateUrl: './group-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupEditModalComponent implements OnChanges, OnInit, OnDestroy {
  @Input() isAuthenticated: boolean;
  @Input() authUser: User;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('form') form: NgForm;

  action: EditAction = EditAction.Create;
  isSaving$ = new BehaviorSubject<boolean>(false);
  group: Group|NewGroup = <NewGroup>{
    name: '',
    logo: null,
    coverImage: null,
    admins: [],
    welcomeMessage: '',
  };
  groupUsers = [];
  setupCampaign = true;
  errorMessage = '';
  errors: { [key: string]: any } = {};

  private stateSubscription: Subscription;

  constructor(
    private alertify: AlertifyService,
    private auth: AuthService,
    private groupService: GroupService,
    public modalService: ModalService,
    private router: Router,
    private state: StateService,
    private userService: UserService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (has(changes, 'authUser.currentValue')) {
      this.initAuthUser();
    }
  }

  ngOnInit(): void {
    this.stateSubscription = this.state.modal.groupEdit$
      .subscribe((state: ModalState) => {
        if (state.isOpen && !this.modal.isShown) {
          this.reset();
          this.initAuthUser();
          this.modal.show();
        } else if (!state.isOpen && this.modal.isShown) {
          this.modal.hide();
        }

        const options = <GroupEditModalOptions>state.options;
        this.action = has(options, 'action') ? options.action : EditAction.Create;
        if (has(options, 'group') && options.group) { this.initGroup(options.group); }
      });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  save(groupToSave: Group|NewGroup, setupCampaign): void {
    this.errorMessage = '';
    this.errors = {};

    this.isSaving$.next(true);
    this.groupService.save(groupToSave)
      .finally(() => this.isSaving$.next(false))
      .switchMap((group: Group) => this.state.group$
        .first()
        .map((currentGroup: Group) => ({ group, currentGroup })))
      .subscribe(
        ({ group, currentGroup }) => {
          if (
            this.action === EditAction.Create ||
            currentGroup && currentGroup._id === group._id
          ) {
            this.auth.loadCurrentUser(false).subscribe();
            this.state.group = group;
          }

          if (this.action === EditAction.Create) {
            this.router.navigate(['/g', group.urlName], {
              queryParams: setupCampaign ? { setupCampaign: true } : {},
            });
          }

          this.alertify.success(`${this.action}d group <b>${group.name}</b>`);
          this.onClose();
        },
        (error: ApiError) => {
          if (has(error, 'errors') && keys(error.errors).length) {
            this.errors = error.errors;
          } else {
            this.errorMessage = error.message;
          }
        },
      );
  }

  onClose(): void {
    this.state.modal.groupEdit$.next({ isOpen: false });
  }

  private initAuthUser(): void {
    if (!this.group._id && this.authUser) {
      this.groupUsers = [this.authUser];
      this.group.admins = [this.authUser._id];
    }
  }

  private initGroup(group: Group): void {
    this.group = group;
    this.setupCampaign = false;
    this.userService.find({ groups: group._id })
      .subscribe((groupUsers: User[]) => this.groupUsers = groupUsers);
  }

  private reset(): void {
    this.action = EditAction.Create;
    this.isSaving$.next(false);
    this.group.name = '';
    this.group.logo = null;
    this.group.coverImage = null;
    this.group.admins = [];
    this.group.welcomeMessage = '';
    this.groupUsers = [];
    this.setupCampaign = true;
    this.errorMessage = '';
    this.errors = {};
    this.form.resetForm();
  }
}

interface GroupEditModalOptions {
  action: EditAction;
  group?: Group;
}
