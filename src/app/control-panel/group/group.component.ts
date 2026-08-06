import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { has } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Group, GroupId } from '../../core/models';
import {
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
    public env: EnvironmentService,
    public auth: AuthService,
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
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
