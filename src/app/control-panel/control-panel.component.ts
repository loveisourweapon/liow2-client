import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { capitalize } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { Group, User } from '../core/models';
import { CommentService, EnvironmentService, StateService } from '../core/services';
import { identifyBy } from '../shared';

@Component({
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  activePage$: Observable<string>;

  identifyBy = identifyBy;

  private userSubscription: Subscription;

  constructor(
    private commentService: CommentService,
    public env: EnvironmentService,
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

    // Load the counts behind the moderation badges. Only groups the user
    // moderates are counted - the server refuses the filter for anyone else
    this.userSubscription = this.state.auth.user$
      .filter((user: User) => user !== null)
      .subscribe((user: User) =>
        this.getModeratedGroups(user).forEach((group: Group) =>
          this.commentService.countPending(group._id)
        )
      );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private getModeratedGroups(user: User): Group[] {
    return (user.groups || []).filter(
      (group: Group) => user.superAdmin || (group.admins || []).indexOf(user._id) !== -1
    );
  }
}
