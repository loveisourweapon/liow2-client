import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { EnvironmentService, TitleService } from '../../core/services';

@Component({
  templateUrl: './faqs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FAQsComponent implements OnInit {
  constructor(private title: TitleService, public env: EnvironmentService) {}

  ngOnInit(): void {
    this.title.set(`Frequently Asked Questions`);
  }
}
