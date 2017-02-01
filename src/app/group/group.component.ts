import { Component, OnDestroy, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Group, GroupService } from '../store';
import * as group from '../store/actions/group';
import * as fromRoot from '../store/reducers';

@Component({
  templateUrl: './group.component.html',
})
export class GroupComponent implements OnDestroy, OnInit {
  group$: Observable<Group>;
  isAuthenticated$: Observable<boolean>;

  // TODO: do something useful with these
  // should they be in the store?
  isLoading: boolean;
  isLoaded: boolean;

  private subscription: Subscription;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.group$ = this.store.select(fromRoot.getCurrentGroup);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);

    this.subscription = this.route.params
      .map((params: Params) => params['groupSlug'])
      .do(() => {
        this.isLoading = true;
        this.isLoaded = false;
      })
      .flatMap((groupSlug: string) => this.groupService.findOne(new URLSearchParams(`urlName=${groupSlug}`)))
      .do(() => this.isLoaded = true)
      .subscribe((currentGroup: Group) => {
        this.store.dispatch(new group.SetCurrentAction(currentGroup));
        this.isLoading = false;
      }, () => null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
