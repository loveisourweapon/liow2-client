import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Deed, DeedSlug } from '../store/deed';
import { Group } from '../store/group';
import * as act from '../store/act/act.actions';
import * as deed from '../store/deed/deed.actions';
import * as modal from '../store/modal.actions';
import * as fromRoot from '../store/reducer';

@Component({
  templateUrl: './deed.component.html',
  styleUrls: ['./deed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedComponent implements OnDestroy, OnInit {
  deed$: Observable<Deed>;
  deedCounter$: Observable<number>;
  authGroup$: Observable<Group>;
  isAuthenticated$: Observable<boolean>;
  isDoing$: Observable<boolean>;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.deed$ = this.store.select(fromRoot.getCurrentDeed);
    this.deedCounter$ = this.store.select(fromRoot.getCurrentDeedCount);
    this.authGroup$ = this.store.select(fromRoot.getAuthGroup);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    this.isDoing$ = this.store.select(fromRoot.getDeedIsDoing);

    this.subscription = this.route.params
      .map((params: Params) => params['deedSlug'])
      .filter((deedSlug: DeedSlug) => Boolean(deedSlug))
      .distinctUntilChanged()
      .subscribe((deedSlug: DeedSlug) => this.store.dispatch(new deed.FindAndSetCurrentAction({ urlTitle: deedSlug })));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  done(deed$: Observable<Deed>, group$: Observable<Group|null>): void {
    Observable.combineLatest(deed$, group$)
      .take(1)
      .subscribe(([deed, group]: [Deed, Group]) => this.store.dispatch(new act.DoneAction({ deed, group })));
  }

  openLoginModal(): void {
    this.store.dispatch(new modal.OpenLoginAction());
  }
}
