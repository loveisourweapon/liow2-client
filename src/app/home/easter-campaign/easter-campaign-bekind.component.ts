import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'liow-easter-campaign-bekind',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasterCampaignBeKindComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Redirect BeKind users to home page as this page is only for LIOW
    this.router.navigate(['/']);
  }
}
