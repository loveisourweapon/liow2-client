import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { identifyBy } from '../../shared';
import { Counters } from '../../store/act';
import { Group } from '../../store/group';
import { User } from '../../store/user';

@Component({
  selector: 'liow-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeedComponent {
  @Input() authUser: User;
  @Input() counters: Counters;

  identifyBy = identifyBy;

  getGroupCount(counters: Counters, groupId: string): number|null {
    const counter = counters[groupId];
    return typeof counter === 'number' ? counter : null;
  }

  listGroupIds(groups: Group[]): string|null {
    return (groups && groups.length) ? groups.map((group: Group) => group._id).join(',') : null;
  }
}
