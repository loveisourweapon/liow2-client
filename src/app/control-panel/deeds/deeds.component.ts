import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TitleService } from '../../core';
import * as fromRoot from '../../store/reducer';
import { Deed } from '../../store/deed';
import * as modal from '../../store/modal/modal.actions';

@Component({
  templateUrl: './deeds.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedsComponent implements OnInit {
  deeds$: Observable<Deed[]>;

  constructor(
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.deeds$ = this.store.select(fromRoot.getDeeds);
    this.title.set(`Deeds | Control Panel`);
  }

  openDeedPreview(deed: Deed): void {
    this.store.dispatch(new modal.OpenDeedPreviewAction(deed));
  }

  identifyDeed(idx: number, deed: Deed): string {
    return deed._id;
  }
}
