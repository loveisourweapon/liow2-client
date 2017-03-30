import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { search } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { has } from 'lodash';

import { TitleService } from '../../core';
import * as fromRoot from '../../store/reducer';
import * as groupsControlPanel from '../../store/control-panel/groups/groups.actions';
import * as fromGroupsControlPanel from '../../store/control-panel/groups/groups.reducer';
import { Group } from '../../store/group';

@Component({
  templateUrl: './groups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit, OnDestroy {
  state$: Observable<fromGroupsControlPanel.State>;

  private routerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.state$ = this.store.select(fromRoot.getGroupsControlPanel);
    this.title.set(`Groups | Control Panel`);

    this.route.queryParams
      .first()
      .subscribe((queryParams: Params) => {
        const initialParams: any = {};
        if (has(queryParams, 'query')) { initialParams.query = queryParams.query; }
        if (has(queryParams, 'page')) { initialParams.page = Number(queryParams.query); }
        this.store.dispatch(new groupsControlPanel.InitialiseAction(initialParams));
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  onSearch(query: string): void {
    // TODO: might be able to do this with just `search` and watch queryParams changes
    this.store.dispatch(new groupsControlPanel.UpdateQueryAction(query));
    this.store.dispatch(search({ query }));
  }

  showWelcomeMessage(message: string): void { }

  identifyGroup(idx: number, group: Group): string {
    return group._id;
  }
}
