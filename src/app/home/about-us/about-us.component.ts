import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TitleService } from '../../core/services';

@Component({
  templateUrl: './about-us.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent implements OnInit {
  constructor(
    private title: TitleService,
  ) {}

  ngOnInit(): void {
    this.title.set(`About Us`);
  }
}
