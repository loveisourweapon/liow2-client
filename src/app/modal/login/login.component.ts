import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { assign, has } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';

import { ApiError, Credentials, Group, ModalState, User } from '../../core/models';
import { AlertifyService, AuthService, ModalService, StateService } from '../../core/services';

@Component({
  selector: 'liow-login-modal',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent implements OnInit, OnDestroy {
  @Input() group: Group;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('form') form: NgForm;

  isLoggingIn$ = new BehaviorSubject<boolean>(false);
  isSendingConfirmEmail$ = new BehaviorSubject<boolean>(false);
  canSwitch = true;
  credentials = <Credentials>{
    email: '',
    password: '',
  };
  joinGroup = true;
  errorMessage = '';

  private stateSubscription: Subscription;

  constructor(
    private alertify: AlertifyService,
    private auth: AuthService,
    public modalService: ModalService,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.stateSubscription = this.state.modal.login$
      .subscribe((state: ModalState) => {
        if (state.isOpen && !this.modal.isShown) {
          this.reset();
          this.modal.show();
        } else if (!state.isOpen && this.modal.isShown) {
          this.modal.hide();
        }

        const options = <LoginModalOptions>state.options;
        this.canSwitch = has(options, 'canSwitch') ? options.canSwitch : true;
      });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  authenticateEmail(credentials: Credentials, joinGroup: boolean, group: Group): void {
    if (group && joinGroup) {
      credentials = assign({}, credentials, { group: group._id });
    }

    this.errorMessage = '';
    this.isLoggingIn$.next(true);
    this.auth.authenticateEmail(credentials)
      .finally(() => this.isLoggingIn$.next(false))
      .subscribe(
        (user: User) => {
          if (group && joinGroup) { this.state.auth.group = group; }

          this.onClose();
          this.alertify.success(`Signed in` + (!user.confirmed ? `. Please confirm your email address` : ``));
        },
        (error: ApiError) => this.errorMessage = error.message,
      );
  }

  authenticateFacebook(joinGroup: boolean, group: Group): void {
    const userData: any = {};
    if (group && joinGroup) { userData.group = group._id; }

    this.errorMessage = '';
    this.isLoggingIn$.next(true);
    this.auth.authenticateFacebook(userData)
      .finally(() => this.isLoggingIn$.next(false))
      .subscribe(
        () => {
          if (group && joinGroup) { this.state.auth.group = group; }

          this.onClose();
          this.alertify.success(`Signed in`);
        },
        () => this.alertify.error(`Failed signing in`),
      );
  }

  onClose(): void {
    this.state.modal.login$.next({ isOpen: false });
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

  private reset(): void {
    this.isLoggingIn$.next(false);
    this.isSendingConfirmEmail$.next(false);
    this.credentials.email = '';
    this.credentials.password = '';
    this.joinGroup = true;
    this.errorMessage = '';
    this.form.resetForm();
  }
}

interface LoginModalOptions {
  canSwitch: boolean;
}
