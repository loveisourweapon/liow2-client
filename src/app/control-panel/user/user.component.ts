import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent { }
