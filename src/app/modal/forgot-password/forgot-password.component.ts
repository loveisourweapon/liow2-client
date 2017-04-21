import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { has } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';

import { ModalState } from '../../core/models';
import { AlertifyService, AuthService, StateService } from '../../core/services';

@Component({
  selector: 'liow-forgot-password-modal',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('form') form: NgForm;

  isSending$ = new BehaviorSubject<boolean>(false);
  emailAddress = '';

  private stateSubscription: Subscription;

  constructor(
    private alertify: AlertifyService,
    private auth: AuthService,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.stateSubscription = this.state.modal.forgotPassword$
      .subscribe((state: ModalState) => {
        if (state.isOpen && !this.modal.isShown) {
          this.reset();
          this.modal.show();
        } else if (!state.isOpen && this.modal.isShown) {
          this.modal.hide();
        }

        const options = <ForgotPasswordModalOptions>state.options;
        this.emailAddress = has(options, 'emailAddress') ? options.emailAddress : '';
      });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  send(emailAddress: string): void {
    this.isSending$.next(true);
    this.auth.sendForgotPassword(emailAddress)
      .finally(() => this.isSending$.next(false))
      .subscribe(
        () => {
          this.onClose();
          this.alertify.success(`Sent password recovery email to <b>${emailAddress}</b>`);
        },
        () => this.alertify.error(`Failed sending password recovery email`),
      );
  }

  onClose(): void {
    this.state.modal.forgotPassword$.next({ isOpen: false });
  }

  private reset(): void {
    this.isSending$.next(false);
    this.emailAddress = '';
    this.form.resetForm();
  }
}

interface ForgotPasswordModalOptions {
  emailAddress: string;
}
