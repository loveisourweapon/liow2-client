import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SearchItem, SearchItemType } from './index';
import * as layout from './layout.actions';
import { Deed, DeedService } from '../deed';
import { Group, GroupService } from '../group';

@Injectable()
export class LayoutEffects {
  @Effect()
  loadSearchResults$: Observable<Action> = this.actions$
    .ofType(layout.ActionTypes.UPDATE_SEARCH_INPUT).map(toPayload)
    .debounceTime(200)
    .filter((searchInput: string) => searchInput.length >= 2)
    .switchMap((searchInput: string) => Observable.combineLatest(
      this.deedService.find({ query: searchInput, fields: '_id,title,urlTitle' }),
      this.groupService.find({ query: searchInput, fields: '_id,name,urlName' }),
    )
      .map(([deeds, groups]: [Deed[], Group[]]) => {
        const deedResults = deeds.map((deed: Deed) =>
          ({ id: deed.urlTitle, name: deed.title, type: SearchItemType.Deed }));
        const groupResults = groups.map((group: Group) =>
          ({ id: group.urlName, name: group.name, type: SearchItemType.Group }));

        return [...deedResults, ...groupResults];
      })
      .map((searchResults: SearchItem[]) => new layout.UpdateSearchResultsAction(searchResults))
      .catch(() => Observable.of(new layout.UpdateSearchResultsAction([]))));

  constructor(
    private actions$: Actions,
    private deedService: DeedService,
    private groupService: GroupService,
  ) { }
}
