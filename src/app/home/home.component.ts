import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { Group, User } from '../core/models';
import {
  ActService,
  EnvironmentService,
  ModalService,
  StateService,
  TitleService,
} from '../core/services';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  constructor(
    private actService: ActService,
    public env: EnvironmentService,
    public modal: ModalService,
    public state: StateService,
    private title: TitleService
  ) {}

  ngOnInit(): void {
    this.title.clear();

    // Get each of the auth user's group counters
    this.userSubscription = this.state.auth.user$
      .filter((user: User) => user !== null)
      .subscribe((user: User) =>
        user.groups.forEach((group: Group) => this.actService.count({ group: group._id }))
      );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
