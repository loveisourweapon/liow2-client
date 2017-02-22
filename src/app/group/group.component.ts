import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TitleService } from '../core';
import { Group, GroupSlug } from '../store/group';
import * as group from '../store/group/group.actions';
import * as modal from '../store/modal.actions';
import * as fromRoot from '../store/reducer';

@Component({
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnDestroy, OnInit {
  group$: Observable<Group>;
  groupCounter$: Observable<number>;
  isAuthenticated$: Observable<boolean>;

  private routeSubscription: Subscription;
  private groupSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.group$ = this.store.select(fromRoot.getCurrentGroup);
    this.groupCounter$ = this.store.select(fromRoot.getCurrentGroupCount);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);

    this.routeSubscription = this.route.params
      .map((params: Params) => params['groupSlug'])
      .filter((groupSlug: GroupSlug) => Boolean(groupSlug))
      .distinctUntilChanged()
      .subscribe((groupSlug: GroupSlug) => this.store.dispatch(new group.FindAndSetCurrentAction({ urlName: groupSlug })));

    this.groupSubscription = this.group$
      .filter((group: Group) => group !== null)
      .subscribe((group: Group) => this.title.set(group.name));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
  }

  openLoginModal(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }
}
