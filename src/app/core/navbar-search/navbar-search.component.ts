import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { Deed, Group } from '../models';
import { DeedService, GroupService } from '../services';
import { SearchItem, SearchItemType } from './search-item.model';

@Component({
  selector: 'liow-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarSearchComponent implements OnInit {
  @Output() select = new EventEmitter();

  searchQuery$ = new BehaviorSubject<string>('');
  searchResults$: Observable<SearchItem[]>;

  constructor(
    private deedService: DeedService,
    private groupService: GroupService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchResults$ = this.searchQuery$
      .debounceTime(200)
      .filter((searchQuery: string) => searchQuery.length >= 2)
      .switchMap((searchQuery: string) => Observable.combineLatest(
        this.deedService.find({ query: searchQuery, fields: '_id,title,urlTitle' }),
        this.groupService.find({ query: searchQuery, fields: '_id,name,urlName' }),
      )
        .map(([deeds, groups]: [Deed[], Group[]]) => {
          const deedResults = deeds.map((deed: Deed) =>
            ({ id: deed.urlTitle, name: deed.title, type: SearchItemType.Deed }));
          const groupResults = groups.map((group: Group) =>
            ({ id: group.urlName, name: group.name, type: SearchItemType.Group }));

          return [...deedResults, ...groupResults];
        }))
      .startWith([]);
  }

  onSelectItem(item: SearchItem): void {
    if (item.type !== SearchItemType.Deed && item.type !== SearchItemType.Group) { return; }

    const routePrefix = `/${item.type[0].toLowerCase()}`;
    this.router.navigate([routePrefix, item.id]);
    this.searchQuery$.next('');
    this.select.next();
  }
}
