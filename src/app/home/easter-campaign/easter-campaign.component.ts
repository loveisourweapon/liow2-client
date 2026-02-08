import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TitleService, EnvironmentService } from '../../core/services';

@Component({
  templateUrl: './easter-campaign.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasterCampaignComponent implements OnInit {
  constructor(private title: TitleService, public env: EnvironmentService) {}

  ngOnInit(): void {
    this.title.set(`The Easter Campaign`);
  }
}
