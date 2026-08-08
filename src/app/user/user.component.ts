import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { User, UserId } from '../core/models';
import {
  ActService,
  EnvironmentService,
  ModalService,
  StateService,
  TitleService,
  UserService,
} from '../core/services';

@Component({
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnDestroy, OnInit {
  user$: Observable<User>;
  loadError$ = new BehaviorSubject<boolean>(false);

  private retry$ = new BehaviorSubject<Date>(new Date());
  private userSubscription: Subscription;

  constructor(
    private actService: ActService,
    public env: EnvironmentService,
    public modal: ModalService,
    private route: ActivatedRoute,
    public state: StateService,
    private title: TitleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId$ = this.route.params
      .map((params: Params) => params['userId'])
      .distinctUntilChanged();

    // Catch inside the switchMap - an error reaching the outer stream would
    // unsubscribe it, so neither a new id nor a retry would reload the page.
    // Emit null so the template drops the profile it was showing
    this.user$ = Observable.combineLatest(userId$, this.retry$)
      .do(() => this.loadError$.next(false))
      .switchMap(([userId]: [UserId, Date]) =>
        this.userService.get(userId).catch(() => {
          this.loadError$.next(true);
          return Observable.of<User>(null);
        })
      );

    this.userSubscription = this.user$
      .filter((user: User) => user !== null)
      .subscribe((user: User) => {
        this.actService.count({ user: user._id });
        this.title.set(user.name);
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  retryLoad(): void {
    this.retry$.next(new Date());
  }
}
