import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TitleService } from '../../core';

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
