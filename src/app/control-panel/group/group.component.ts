import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Group, GroupId } from '../../core/models';
import {
  AuthService,
  CommentService,
  EnvironmentService,
  GroupService,
  ModalService,
  StateService,
} from '../../core/services';

@Component({
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnInit, OnDestroy {
  numberOfPendingComments$: Observable<number>;

  private routeSubscription: Subscription;

  constructor(
    public env: EnvironmentService,
    public auth: AuthService,
    private commentService: CommentService,
    private groupService: GroupService,
    public modal: ModalService,
    private route: ActivatedRoute,
    public state: StateService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params
      .filter((params: Params) => has(params, 'groupId'))
      .map((params: Params) => params.groupId)
      .switchMap((groupId: GroupId) => this.groupService.findOne({ _id: groupId }))
      .subscribe((group: Group) => (this.state.controlPanel.group = group));

    // Only moderators may filter comments by status, so everyone else is left
    // without a count rather than being sent a request that would be refused
    this.numberOfPendingComments$ = Observable.combineLatest(
      this.state.controlPanel.group$.filter((group: Group) => group !== null),
      this.state.controlPanel.commentsChanged$
    ).switchMap(([group, _]: [Group, Date]) =>
      Observable.combineLatest(this.auth.isAdminOfGroup(group), this.auth.isSuperAdmin())
        .map(([isAdmin, isSuperAdmin]: [boolean, boolean]) => isAdmin || isSuperAdmin)
        .switchMap((canModerate: boolean) =>
          canModerate
            ? this.commentService.count({
                group: group._id,
                'target.group': 'null',
                status: 'pending',
              })
            : Observable.of(0)
        )
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
