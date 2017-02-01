import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { pick } from 'lodash';

import { Deed } from '../../store/models';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'liow-deed-list',
  templateUrl: './deed-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListComponent implements OnInit {
  @Input() layout: string;

  deeds$: Observable<Deed[]>;
  currentDeed$: Observable<Deed>;
  counters$: Observable<{ [key: string]: number }>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.deeds$ = this.store.select(fromRoot.getDeeds)
      .map((deeds: Deed[]) => deeds.map((deed: Deed) => pick(deed, ['_id', 'logo', 'title', 'urlTitle'])));
    this.currentDeed$ = this.store.select(fromRoot.getCurrentDeed);
    this.counters$ = this.store.select(fromRoot.getCountersState);
  }
}
