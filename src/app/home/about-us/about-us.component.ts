import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TitleService, EnvironmentService } from '../../core/services';

@Component({
  template: `
    <liow-about-liow *ngIf="env.appId === 'liow'"></liow-about-liow>
    <liow-about-bekind *ngIf="env.appId === 'bekind'"></liow-about-bekind>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent implements OnInit {
  constructor(
    private title: TitleService,
    public env: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.title.set(`About Us`);
  }
}
