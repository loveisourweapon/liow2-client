import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GroupService, ModalService, StateService, UserService } from '../../core/services';

@Component({
  selector: 'liow-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  numberOfGroups$: Observable<number>;
  numberOfUsers$: Observable<number>;

  constructor(
    private groupService: GroupService,
    public modal: ModalService,
    public state: StateService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.numberOfGroups$ = this.groupService.count({ includeArchived: true });
    this.numberOfUsers$ = this.userService.count();
  }
}
