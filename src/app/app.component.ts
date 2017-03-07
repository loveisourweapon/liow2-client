import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as layout from './store/layout';
import * as fromRoot from './store/reducer';

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
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new layout.SetIsSmallScreenAction(this.checkIsSmallScreen(window.innerWidth)));

    // Scroll to top of window when navigating
    this.routerSubscription = this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => window.scrollTo(0, 0));

    // Listen for resize and update isSmallScreen
    this.resizeSubscription = Observable.fromEvent(window, 'resize')
      .debounceTime(100)
      .map((event: UIEvent) => this.checkIsSmallScreen(event.target['innerWidth']))
      .subscribe((isSmallScreen: boolean) => this.store.dispatch(new layout.SetIsSmallScreenAction(isSmallScreen)));

    // Listen for 'esc' key press and close menu
    this.keyboardSubscription = Observable.fromEvent(window, 'keydown')
      .filter((event: KeyboardEvent) => event.code === 'Escape' || event.keyCode === 27)
      .subscribe(() => this.store.dispatch(new layout.SetIsMenuOpenAction(false)));
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
