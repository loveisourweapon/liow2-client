import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { EnvironmentService, StateService } from './core/services';

@Component({
  selector: 'liow-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy, OnInit {
  date = new Date();

  private routerSubscription: Subscription;
  private resizeSubscription: Subscription;
  private keyboardSubscription: Subscription;

  constructor(
    private router: Router,
    private state: StateService,
    public env: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.state.layout.isSmallScreen = this.checkIsSmallScreen(window.innerWidth);

    // Watch router navigation events
    this.routerSubscription = this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        // Scroll to top of window when navigating
        window.scrollTo(0, 0);

        if (this.env.googleAnalytics) {
          // Send Google Analytics pageview event
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });

    // Listen for resize and update isSmallScreen
    this.resizeSubscription = Observable.fromEvent(window, 'resize')
      .map((event: UIEvent) => this.checkIsSmallScreen(event.target['innerWidth']))
      .subscribe((isSmallScreen: boolean) => (this.state.layout.isSmallScreen = isSmallScreen));

    // Listen for 'esc' key press and close menu
    this.keyboardSubscription = Observable.fromEvent(window, 'keydown')
      .filter((event: KeyboardEvent) => event.code === 'Escape' || event.keyCode === 27)
      .subscribe(() => (this.state.layout.isMenuOpen = false));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.resizeSubscription.unsubscribe();
    this.keyboardSubscription.unsubscribe();
  }

  private checkIsSmallScreen(screenWidth: number): boolean {
    return screenWidth < 768;
  }
}
