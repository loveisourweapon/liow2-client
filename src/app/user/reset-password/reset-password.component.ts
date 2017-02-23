import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { has, pick } from 'lodash';

import { TitleService } from '../../core';
import * as auth from '../../store/auth/auth.actions';
import * as resetPassword from '../../store/reset-password/reset-password.actions';
import { State as ResetPasswordState, ResetPasswordRequest } from '../../store/reset-password';
import * as fromRoot from '../../store/reducer';

@Component({
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  state$: Observable<ResetPasswordState>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new resetPassword.InitialiseAction());

    this.state$ = this.store.select(fromRoot.getResetPassword);
    this.route.params
      .filter((params: Params) => has(params, 'token'))
      .first()
      .subscribe((params: Params) => this.onUpdatePropertyAction('Token', params['token']));

    this.title.set(`Reset Password`);
  }

  save(): void {
    this.state$.take(1)
      .subscribe((state: ResetPasswordState) =>
        this.store.dispatch(new auth.ResetPasswordAction(<ResetPasswordRequest>pick(state, ['password', 'token']))));
  }

  onUpdatePropertyAction(property: string, value: string): void {
    this.store.dispatch(new resetPassword[`Update${property}Action`](value));
  }
}
