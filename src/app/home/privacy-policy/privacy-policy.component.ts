import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { EnvironmentService, TitleService } from '../../core/services';

@Component({
  templateUrl: './privacy-policy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(public env: EnvironmentService, private title: TitleService) {}

  ngOnInit(): void {
    this.title.set(`Privacy Policy`);
  }
}
