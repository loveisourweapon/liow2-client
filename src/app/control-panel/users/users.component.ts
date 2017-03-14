import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent { }
