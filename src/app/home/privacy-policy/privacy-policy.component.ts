import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { EnvironmentService, TitleService } from '../../core/services';

@Component({
  template: `
    <liow-privacy-liow *ngIf="env.appId === 'liow'"></liow-privacy-liow>
    <liow-privacy-bekind *ngIf="env.appId === 'bekind'"></liow-privacy-bekind>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(
    public env: EnvironmentService,
    private title: TitleService
  ) {}

  ngOnInit(): void {
    this.title.set(`Privacy Policy`);
  }
}
