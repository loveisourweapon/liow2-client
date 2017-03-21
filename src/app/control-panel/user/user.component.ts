import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User } from '../../store/user';
import * as fromRoot from '../../store/reducer';

@Component({
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  authUser$: Observable<User>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.authUser$ = this.store.select(fromRoot.getAuthUser);
  }

  toggleEditName(): void { }
  openChangePassword(): void { }
  sendConfirmEmail(): void { }
}
