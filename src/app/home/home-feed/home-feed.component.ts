import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Counters, Group, User } from '../../store/models';

@Component({
  selector: 'liow-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeedComponent {
  @Input() authUser: User;
  @Input() counters: Counters;

  getGroupCount(counters: Counters, groupId: string): number|null {
    const counter = counters[groupId];
    return typeof counter === 'number' ? counter : null;
  }

  listGroupIds(groups: Group[]): string|null {
    return (groups && groups.length) ? groups.map((group: Group) => group._id).join(',') : null;
  }
}
