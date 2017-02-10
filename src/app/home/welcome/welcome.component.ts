import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as modal from '../../store/actions/modal';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'liow-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  actsCount$: Observable<number>;
  groupsCount$: Observable<number>;
  usersCount$: Observable<number>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.actsCount$ = this.store.select(fromRoot.getGlobalCount);
    this.groupsCount$ = this.store.select(fromRoot.getGroupsCount);
    this.usersCount$ = this.store.select(fromRoot.getUsersCount);
  }

  openLoginModal(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }

  openSignupModal(): void {
    this.store.dispatch(new modal.OpenSignupAction());
  }
}
