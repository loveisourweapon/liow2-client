import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Deed } from '../../core/models';
import { DeedService, ModalService, TitleService } from '../../core/services';
import { identifyBy } from '../../shared';

@Component({
  templateUrl: './deeds.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedsComponent implements OnInit {
  deeds$: Observable<Deed[]>;

  identifyBy = identifyBy;

  constructor(
    private deedService: DeedService,
    public modal: ModalService,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.deeds$ = this.deedService.find();
    this.title.set(`Deeds | Control Panel`);
  }
}
