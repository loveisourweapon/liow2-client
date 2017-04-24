import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';

import { JsonPatchOp, User } from '../../core/models';
import {
  ActService,
  AlertifyService,
  AuthService,
  ModalService,
  StateService,
  TitleService,
  UserService,
} from '../../core/services';

@Component({
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  isEditingName$ = new BehaviorSubject<boolean>(false);
  isSendingConfirmEmail$ = new BehaviorSubject<boolean>(false);
  inputs = {
    firstName: '',
    lastName: '',
  };

  private userSubscription: Subscription;
  private isEditingSubscription: Subscription;

  constructor(
    private actService: ActService,
    private alertify: AlertifyService,
    private auth: AuthService,
    private element: ElementRef,
    public modal: ModalService,
    public state: StateService,
    private title: TitleService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.state.auth.user$
      .filter((user: User) => user !== null)
      .do((user: User) => {
        this.title.set(`${user.name} | Control Panel`);
        this.actService.count({ user: user._id });
      })
      .subscribe((user: User) => this.state.controlPanel.user = user);

    // Autofocus first name field when starting name editing
    this.isEditingSubscription = this.isEditingName$
      .distinctUntilChanged()
      .filter((isEditingName: boolean) => isEditingName)
      .delay(100) // allow time for form to be added to DOM
      .subscribe(() => {
        const firstNameElement = this.element.nativeElement.querySelector('#firstName');
        if (firstNameElement) { firstNameElement.focus(); }
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.isEditingSubscription.unsubscribe();
  }

  setEditingName(isEditingName: boolean, user: User): void {
    this.isEditingName$.next(isEditingName);
    this.inputs.firstName = isEditingName ? user.firstName : '';
    this.inputs.lastName = isEditingName ? user.lastName : '';
  }

  saveUserName(user: User, firstName: string, lastName: string): void {
    this.isEditingName$.next(false);
    this.userService.update(user, [
      { op: JsonPatchOp.Replace, path: `/firstName`, value: firstName },
      { op: JsonPatchOp.Replace, path: `/lastName`, value: lastName },
    ])
      .switchMap(() => this.auth.loadCurrentUser(false))
      .finally(() => {
        this.isEditingName$.next(false);
        this.inputs.firstName = '';
        this.inputs.lastName = '';
      })
      .subscribe(
        () => this.alertify.success(`Updated name`),
        () => this.alertify.error(`Failed updating name`),
      );
  }

  sendConfirmEmail(emailAddress: string): void {
    this.isSendingConfirmEmail$.next(true);
    this.auth.sendConfirmEmail(emailAddress)
      .finally(() => this.isSendingConfirmEmail$.next(false))
      .subscribe(
        () => this.alertify.success(`Sent confirmation email to <b>${emailAddress}</b>`),
        () => this.alertify.error(`Failed sending confirmation email`),
      );
  }
}
