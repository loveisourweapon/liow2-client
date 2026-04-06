import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { EnvironmentService, TitleService } from '../../core/services';

@Component({
  template: `
    <liow-faqs-liow *ngIf="env.appId === 'liow'"></liow-faqs-liow>
    <liow-faqs-bekind *ngIf="env.appId === 'bekind'"></liow-faqs-bekind>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FAQsComponent implements OnInit {
  constructor(
    private title: TitleService,
    public env: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.title.set(`Frequently Asked Questions`);
  }
}
