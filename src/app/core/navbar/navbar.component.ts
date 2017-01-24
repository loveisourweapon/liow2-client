import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as layout from '../../store/actions/layout';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'liow-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.isMenuOpen$ = this.store.select(fromRoot.getIsMenuOpen);
  }

  toggleMenu(): void {
    this.store.dispatch(new layout.ToggleMenuAction());
  }

  closeMenu(): void {
    this.store.dispatch(new layout.CloseMenuAction());
  }
}
