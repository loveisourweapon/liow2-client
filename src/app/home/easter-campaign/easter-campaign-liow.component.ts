import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EnvironmentService, ModalService } from '../../core/services';

@Component({
  selector: 'liow-easter-campaign-liow',
  templateUrl: './easter-campaign-liow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasterCampaignLiowComponent {
  constructor(public env: EnvironmentService, public modal: ModalService) {}
}
