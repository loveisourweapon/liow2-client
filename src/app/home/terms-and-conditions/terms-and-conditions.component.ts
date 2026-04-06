import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { EnvironmentService, TitleService } from '../../core/services';

@Component({
  template: `
    <liow-terms-liow *ngIf="env.appId === 'liow'"></liow-terms-liow>
    <liow-terms-bekind *ngIf="env.appId === 'bekind'"></liow-terms-bekind>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsAndConditionsComponent implements OnInit {
  constructor(
    public env: EnvironmentService,
    private title: TitleService
  ) {}

  ngOnInit(): void {
    this.title.set(`Terms and Conditions`);
  }
}
