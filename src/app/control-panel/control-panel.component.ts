import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { capitalize } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { StateService } from '../core/services';
import { identifyBy } from '../shared';

@Component({
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent implements OnInit {
  activePage$: Observable<string>;

  identifyBy = identifyBy;

  constructor(
    private router: Router,
    public state: StateService,
  ) { }

  ngOnInit(): void {
    // Get active page from router
    this.activePage$ = this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .filter((event: NavigationEnd) => /^\/control-panel/.test(event.urlAfterRedirects))
      .map((event: NavigationEnd) => {
        const [, , routePath] = event.urlAfterRedirects.split('/');
        const [pageTitle] = routePath.split('?');
        return capitalize(pageTitle);
      });

    // Redirect to home if user logs out
    this.state.auth.isAuthenticated$
      .filter((isAuthenticated: boolean) => isAuthenticated === false)
      .first()
      .subscribe(() => this.router.navigate(['/']));
  }
}
