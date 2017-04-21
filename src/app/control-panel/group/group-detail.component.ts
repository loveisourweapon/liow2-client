import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Group, User } from '../../core/models';
import { ActService, AuthService, ModalService, StateService, TitleService, UserService } from '../../core/services';
import { SearchParams } from '../../shared';

@Component({
  templateUrl: './group-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetailComponent implements OnInit {
  numberOfMembers$: Observable<number>;

  constructor(
    private actService: ActService,
    public auth: AuthService,
    public modal: ModalService,
    public state: StateService,
    private title: TitleService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.numberOfMembers$ = this.state.controlPanel.group$
      .do((group: Group) => {
        this.actService.count({ group: group._id });
        this.title.set(`${group.name} | Control Panel`);
      })
      .map((group: Group) => (<SearchParams>{ groups: group._id }))
      .switchMap((searchParams: SearchParams) => this.userService.count(searchParams));
  }

  leaveGroup(user: User, group: Group): void { }
}
