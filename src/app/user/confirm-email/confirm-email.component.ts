import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { has } from 'lodash';

import * as auth from '../../store/actions/auth';
import { State as AppState } from '../../store/reducers';

@Component({
  templateUrl: './confirm-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.route.params
      .filter((params: Params) => has(params, 'token'))
      .first()
      .map((params: Params) => this.store.dispatch(new auth.ConfirmEmailAction(params['token'])))
      .subscribe();
  }
}
