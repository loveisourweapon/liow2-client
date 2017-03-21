import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TitleService } from '../../core';
import { User } from '../../store/user';
import * as userControlPanel from '../../store/control-panel/user';
import * as fromUserControlPanel from '../../store/control-panel/user/user.reducer';
import * as fromRoot from '../../store/reducer';

@Component({
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  state$: Observable<fromUserControlPanel.State>;
  userCounter$: Observable<number>;

  private authUserSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.state$ = this.store.select(fromRoot.getUserControlPanel);
    this.userCounter$ = this.store.select(fromRoot.getAuthUserCount);

    this.authUserSubscription = this.store.select(fromRoot.getAuthUser)
      .filter((user: User) => user !== null)
      .subscribe((user: User) => {
        this.store.dispatch(new userControlPanel.SetUserAction(user));
        this.title.set(`${user.name} | Control Panel`);
      });
  }

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
  }

  toggleEditName(): void { }
  openChangePassword(): void { }
  sendConfirmEmail(): void { }
}
