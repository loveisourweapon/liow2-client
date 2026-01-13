import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/distinctUntilChanged';
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
    this.user$ = this.route.params
      .map((params: Params) => params['userId'])
      .distinctUntilChanged()
      .switchMap((userId: UserId) => this.userService.get(userId));

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
}
