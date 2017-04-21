import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Deed } from '../../core/models';
import { DeedService, ModalService, StateService, TitleService } from '../../core/services';
import { identifyBy } from '../../shared';

@Component({
  templateUrl: './deeds.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedsComponent implements OnInit {
  identifyBy = identifyBy;

  constructor(
    private deedService: DeedService,
    public modal: ModalService,
    public state: StateService,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.deedService.find()
      .subscribe((deeds: Deed[]) => this.state.controlPanel.deeds = deeds);

    this.title.set(`Deeds | Control Panel`);
  }
}
