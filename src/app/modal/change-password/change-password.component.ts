import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { has } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';

import { ApiError, JsonPatchOp, ModalState, User } from '../../core/models';
import { AlertifyService, StateService, UserService } from '../../core/services';

@Component({
  selector: 'liow-change-password-modal',
  templateUrl: './change-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('form') form: NgForm;

  isSaving$ = new BehaviorSubject<boolean>(false);
  user: User;
  inputs = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  errorMessage = '';

  private stateSubscription: Subscription;

  constructor(
    private alertify: AlertifyService,
    private state: StateService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.stateSubscription = this.state.modal.changePassword$
      .subscribe((state: ModalState) => {
        if (state.isOpen && !this.modal.isShown) {
          this.reset();
          this.modal.show();
        } else if (!state.isOpen && this.modal.isShown) {
          this.modal.hide();
        }

        const options = <ChangePasswordModalOptions>state.options;
        this.user = has(options, 'user') ? options.user : null;
      });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  save(user: User, currentPassword: string, newPassword: string): void {
    this.errorMessage = '';

    this.isSaving$.next(true);
    this.userService.update(user, [
      { op: JsonPatchOp.Add, path: `/currentPassword`, value: currentPassword },
      { op: JsonPatchOp.Add, path: `/newPassword`, value: newPassword },
    ])
      .finally(() => this.isSaving$.next(false))
      .subscribe(
        () => {
          this.onClose();
          this.alertify.success(`Password changed`);
        },
        (error: ApiError) => this.errorMessage = error.message,
      );
  }

  onClose(): void {
    this.state.modal.changePassword$.next({ isOpen: false });
  }

  private reset(): void {
    this.isSaving$.next(false);
    this.inputs.currentPassword = '';
    this.inputs.newPassword = '';
    this.inputs.confirmPassword = '';
    this.errorMessage = '';
    this.form.resetForm();
  }
}

interface ChangePasswordModalOptions {
  user: User;
}
