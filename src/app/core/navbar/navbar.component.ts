import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, LayoutState } from '../reducers';
import { LayoutActionTypes } from '../actions';

@Component({
  selector: 'liow-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMenuOpen$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.isMenuOpen$ = this.store.select('layout').map((state: LayoutState) => state.isMenuOpen);
  }

  toggleMenu(): void {
    this.store.dispatch({ type: LayoutActionTypes.TOGGLE_MENU });
  }

  closeMenu(): void {
    this.store.dispatch({ type: LayoutActionTypes.CLOSE_MENU });
  }
}
