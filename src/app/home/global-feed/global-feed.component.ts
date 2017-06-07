import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { StateService, TitleService } from '../../core/services';

@Component({
  templateUrl: './global-feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalFeedComponent implements OnInit {
  constructor(
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.title.set(`Global Activity Feed`);
  }
}
