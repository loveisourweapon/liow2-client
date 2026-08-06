import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

import { identifyBy } from '../../shared';
import { Group, User } from '../models';
import {
  ActService,
  AuthService,
  CommentService,
  EnvironmentService,
  ModalService,
  StateService,
} from '../services';

@Component({
  selector: 'liow-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  identifyBy = identifyBy;

  private readonly refreshTimer = 10000;
  private timerSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private actService: ActService,
    private commentService: CommentService,
    public env: EnvironmentService,
    public auth: AuthService,
    public modal: ModalService,
    public state: StateService
  ) {}

  ngOnInit(): void {
    // Load initial global counter and setup regular refresh
    this.timerSubscription = Observable.timer(0, this.refreshTimer).subscribe(() =>
      this.actService.count()
    );

    // Load the moderation counts shown here and in the control panel
    this.userSubscription = this.state.auth.user$
      .filter((user: User) => user !== null)
      .subscribe((user: User) =>
        this.getModeratedGroups(user).forEach((group: Group) =>
          this.commentService.countPending(group._id)
        )
      );
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  openMenu(): void {
    this.state.layout.isMenuOpen = true;
  }

  getNonArchivedGroups(groups: Group[]): Group[] {
    return groups ? groups.filter((group) => !group.archived) : [];
  }

  private getModeratedGroups(user: User): Group[] {
    return this.getNonArchivedGroups(user.groups).filter(
      (group: Group) => user.superAdmin || (group.admins || []).indexOf(user._id) !== -1
    );
  }
}
