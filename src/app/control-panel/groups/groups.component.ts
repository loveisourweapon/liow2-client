import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { search } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TitleService } from '../../core';
import * as fromRoot from '../../store/reducer';
import * as groupsControlPanel from '../../store/control-panel/groups/groups.actions';
import * as fromGroupsControlPanel from '../../store/control-panel/groups/groups.reducer';
import { Group } from '../../store/group';

@Component({
  templateUrl: './groups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  state$: Observable<fromGroupsControlPanel.State>;

  constructor(
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.state$ = this.store.select(fromRoot.getGroupsControlPanel);
    this.title.set(`Groups | Control Panel`);

    this.store.dispatch(new groupsControlPanel.InitialiseAction());
  }

  onSearch(query: string): void {
    this.store.dispatch(new groupsControlPanel.UpdateQueryAction(query));
    this.store.dispatch(search({ query }));
  }

  showWelcomeMessage(message: string): void { }

  identifyGroup(idx: number, group: Group): string {
    return group._id;
  }
}
