import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { pick } from 'lodash';

import { Deed } from '../../store';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'liow-deed-list',
  templateUrl: './deed-list.component.html',
})
export class DeedListComponent {
  @Input() layout: string;

  deeds$: Observable<Deed[]>;

  constructor(
    store: Store<fromRoot.State>,
  ) {
    this.deeds$ = store.select(fromRoot.getDeeds)
      .map((deeds: Deed[]) => deeds.map((deed: Deed) => pick(deed, ['_id', 'logo', 'title', 'urlTitle'])));
  }
}
