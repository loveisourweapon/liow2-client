import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { has, some } from 'lodash';

import { FeedItem } from '../../store/feed';
import { Group } from '../../store/group';
import { User } from '../../store/user';

@Component({
  selector: 'liow-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedItemComponent {
  @Input() item: FeedItem;
  @Input() authUser: User;

  isMemberOfGroup(authUser: User, group: Group): boolean {
    return (
      has(authUser, 'groups') &&
      has(group, '_id') &&
      some(authUser.groups, (userGroup: Group) => userGroup._id === group._id)
    );
  }
}
