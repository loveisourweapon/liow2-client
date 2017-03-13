import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SearchItem, SearchItemType } from '../../store/layout';
import * as layout from '../../store/layout/layout.actions';
import * as fromRoot from '../../store/reducer';

@Component({
  selector: 'liow-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarSearchComponent implements OnInit {
  searchInput$: Observable<string>;
  searchResults$: Observable<SearchItem[]>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.searchInput$ = this.store.select(fromRoot.getNavbarSearchInput);
    this.searchResults$ = this.store.select(fromRoot.getNavbarSearchResults);
  }

  onSearchInputChange(searchInput: string): void {
    this.store.dispatch(new layout.UpdateSearchInputAction(searchInput));
  }

  onSelectItem(item: SearchItem): void {
    if (item.type !== SearchItemType.Deed && item.type !== SearchItemType.Group) { return; }

    const routePrefix = `/${item.type[0].toLowerCase()}`;
    this.store.dispatch(go([routePrefix, item.id]));
    this.store.dispatch(new layout.UpdateSearchInputAction(''));
  }
}
