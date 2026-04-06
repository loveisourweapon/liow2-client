import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EnvironmentService } from '../services';

@Component({
  selector: 'liow-promo-banner',
  template: `
    <liow-promo-banner-liow *ngIf="env.appId === 'liow'"></liow-promo-banner-liow>
    <liow-promo-banner-bekind *ngIf="env.appId === 'bekind'"></liow-promo-banner-bekind>
  `,
  styleUrls: ['./promo-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoBannerComponent {
  constructor(public env: EnvironmentService) {}
}
