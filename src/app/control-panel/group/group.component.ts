import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Group, GroupId } from '../../core/models';
import {
  AlertifyService,
  AuthService,
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
  private routeSubscription: Subscription;

  constructor(
    private alertify: AlertifyService,
    public env: EnvironmentService,
    public auth: AuthService,
    private groupService: GroupService,
    public modal: ModalService,
    private route: ActivatedRoute,
    public state: StateService
  ) {}

  ngOnInit(): void {
    // Catch inside the switchMap - an error reaching the outer stream would
    // unsubscribe it, leaving the control panel stuck until it is reopened.
    // Clearing the group rather than keeping the last one loaded, so admin
    // actions can't be aimed at a group the URL no longer names
    this.routeSubscription = this.route.params
      .filter((params: Params) => has(params, 'groupId'))
      .map((params: Params) => params.groupId)
      .switchMap((groupId: GroupId) =>
        this.groupService.findOne({ _id: groupId }).catch(() => {
          this.alertify.error(`Failed loading group`);
          return Observable.of<Group>(null);
        })
      )
      .subscribe((group: Group) => (this.state.controlPanel.group = group));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
