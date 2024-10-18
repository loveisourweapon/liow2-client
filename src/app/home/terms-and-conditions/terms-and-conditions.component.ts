import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TitleService } from '../../core/services';

@Component({
  templateUrl: './terms-and-conditions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsAndConditionsComponent implements OnInit {
  constructor(
    private title: TitleService,
  ) {}

  ngOnInit(): void {
    this.title.set(`Terms and Conditions`);
  }
}
