import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EnvironmentService } from '../services';

@Component({
  selector: 'liow-promo-banner',
  templateUrl: './promo-banner.component.html',
  styleUrls: ['./promo-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoBannerComponent {
  constructor(public env: EnvironmentService) {}
}
