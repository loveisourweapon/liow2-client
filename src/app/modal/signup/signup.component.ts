import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { assign, has, keys, pick } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';

import { ApiError, Credentials, Group, ModalState, NewUser } from '../../core/models';
import { AlertifyService, AuthService, ModalService, StateService, UserService } from '../../core/services';

@Component({
  selector: 'liow-signup-modal',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupModalComponent implements OnInit, OnDestroy {
  @Input() group: Group;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('form') form: NgForm;

  isSigningUp$ = new BehaviorSubject<boolean>(false);
  canSwitch = true;
  user = <NewUser>{
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };
  joinGroup = true;
  errorMessage = '';
  errors: { [key: string]: any } = {};

  private stateSubscription: Subscription;

  constructor(
    private alertify: AlertifyService,
    private auth: AuthService,
    public modalService: ModalService,
    private state: StateService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.stateSubscription = this.state.modal.signup$
      .subscribe((state: ModalState) => {
        if (state.isOpen && !this.modal.isShown) {
          this.reset();
          this.modal.show();
        } else if (!state.isOpen && this.modal.isShown) {
          this.modal.hide();
        }

        const options = <SignupModalOptions>state.options;
        this.canSwitch = has(options, 'canSwitch') ? options.canSwitch : true;
      });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  signup(newUser: NewUser, joinGroup: boolean, group: Group): void {
    if (group && joinGroup) {
      newUser = assign({}, newUser, { groups: [group._id] });
    }

    this.errorMessage = '';
    this.errors = {};

    this.isSigningUp$.next(true);
    this.userService.save(newUser)
      .switchMap(() => {
        if (group && joinGroup) { this.state.auth.group = group; }

        this.alertify.success(`Signed up. Please confirm your email address`);
        return this.auth.authenticateEmail(<Credentials>pick(newUser, ['email', 'password']));
      })
      .finally(() => this.isSigningUp$.next(false))
      .subscribe(
        () => this.onClose(),
        (error: ApiError) => {
          if (has(error, 'errors') && keys(error.errors).length) {
            this.errors = error.errors;
          } else {
            this.errorMessage = error.message;
          }
        },
      );
  }

  authenticateFacebook(joinGroup: boolean, group: Group): void {
    const userData: any = {};
    if (group && joinGroup) { userData.group = group._id; }

    this.errorMessage = '';
    this.errors = {};

    this.isSigningUp$.next(true);
    this.auth.authenticateFacebook(userData)
      .finally(() => this.isSigningUp$.next(false))
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
    this.state.modal.signup$.next({ isOpen: false });
  }

  private reset(): void {
    this.isSigningUp$.next(false);
    this.user.email = '';
    this.user.password = '';
    this.user.firstName = '';
    this.user.lastName = '';
    this.joinGroup = true;
    this.errorMessage = '';
    this.errors = {};
    this.form.resetForm();
  }
}

interface SignupModalOptions {
  canSwitch: boolean;
}
