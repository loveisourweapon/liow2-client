import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'liow-promo-banner-liow',
  template: `
    <div class="promo-banner">
      <a routerLink="/the-easter-campaign">Join us for The Easter Campaign 2026</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoBannerLiowComponent {}
