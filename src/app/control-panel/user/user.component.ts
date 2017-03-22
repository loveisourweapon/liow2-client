import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TitleService } from '../../core';
import { User } from '../../store/user';
import * as userControlPanel from '../../store/control-panel/user';
import * as fromUserControlPanel from '../../store/control-panel/user/user.reducer';
import * as auth from '../../store/auth/auth.actions';
import * as fromRoot from '../../store/reducer';

@Component({
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  state$: Observable<fromUserControlPanel.State>;
  userCounter$: Observable<number>;

  private authUserSubscription: Subscription;
  private stateSubscription: Subscription;

  constructor(
    private element: ElementRef,
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

    // Autofocus first name field when starting name editing
    this.stateSubscription = this.state$
      .map((state: fromUserControlPanel.State) => state.isEditingName)
      .distinctUntilChanged()
      .filter((isEditingName: boolean) => isEditingName)
      .debounceTime(100) // allow time for form to be added to DOM
      .subscribe(() => {
        const firstNameElement = this.element.nativeElement.querySelector('#firstName');
        if (firstNameElement) { firstNameElement.focus(); }
      });
  }

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }

  setEditingName(isEditingName: boolean): void {
    this.state$.first()
      .map((state: fromUserControlPanel.State) => state.user)
      .subscribe((user: User) =>
        this.store.dispatch(new userControlPanel.SetIsEditingAction({ isEditingName, user })));
  }

  saveUserName(firstName: string, lastName: string): void {
    this.state$.first()
      .map((state: fromUserControlPanel.State) => state.user)
      .subscribe((user: User) =>
        this.store.dispatch(new userControlPanel.SaveUserNameAction({ user, firstName, lastName })));
  }

  onUpdatePropertyAction(property: string, value: any): void {
    if (value !== null) {
      this.store.dispatch(new userControlPanel[`Update${property}Action`](value));
    }
  }

  openChangePassword(): void { }

  sendConfirmEmail(): void {
    this.state$.first()
      .map((state: fromUserControlPanel.State) => state.user)
      .subscribe((user: User) =>
        this.store.dispatch(new auth.SendConfirmEmailAction(user.email)));
  }
}
