import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { has } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';

import { AlertifyService, AuthService, ModalService, TitleService } from '../../core/services';

@Component({
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  isSaving$ = new BehaviorSubject<boolean>(false);

  inputs = {
    password: '',
    confirmPassword: '',
  };

  private token: string;

  constructor(
    private alertify: AlertifyService,
    private auth: AuthService,
    private modal: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .filter((params: Params) => has(params, 'token'))
      .first()
      .subscribe((params: Params) => this.token = params.token);

    this.title.set(`Reset Password`);
  }

  save(newPassword: string): void {
    this.isSaving$.next(true);
    this.auth.resetPassword(newPassword, this.token)
      .finally(() => this.router.navigate(['/']))
      .subscribe(
        () => {
          this.alertify.success(`Password reset`);
          this.modal.openLogin();
        },
        () => this.alertify.error(`Invalid or expired password reset link. Please try again or contact us`),
      );
  }
}
