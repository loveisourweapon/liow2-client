import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'liow-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy, OnInit {
  date = new Date();

  private subscription: Subscription;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Scroll to top of window when navigating
    this.subscription = this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => window.scrollTo(0, 0));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
