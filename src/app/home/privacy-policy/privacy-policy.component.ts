import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TitleService } from '../../core/services';

@Component({
  templateUrl: './privacy-policy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(
    private title: TitleService,
  ) {}

  ngOnInit(): void {
    this.title.set(`Privacy Policy`);
  }
}
