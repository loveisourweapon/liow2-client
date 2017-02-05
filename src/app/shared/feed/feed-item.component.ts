import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FeedItem, Group, User } from '../../store/models';

@Component({
  selector: 'liow-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedItemComponent {
  @Input() item: FeedItem;
  @Input() authUser: User;

  isLoggedInUser(user: User): boolean {
    // TODO: implement this
    return true;
  }

  isMemberOfGroup(group: Group): boolean {
    // TODO: implement this
    return true;
  }
}
