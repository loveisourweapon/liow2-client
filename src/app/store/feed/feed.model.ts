import { Act } from '../act';
import { Comment } from '../comment';
import { Deed, DeedId } from '../deed';
import { Campaign, Group, GroupId } from '../group';
import { User, UserId } from '../user';

export type FeedItemId = string;

export interface FeedItem {
  _id: FeedItemId;
  user: User;
  group: Group;
  campaign: Campaign;
  target: {
    group: Group;
    deed: Deed;
  };
  act: Act;
  comment: Comment;
  created: Date;
}

export interface FeedCriteria {
  after?: FeedItemId;
  before?: FeedItemId;
  group?: GroupId;
  user?: UserId;
  'target.deed'?: DeedId;
  'target.group'?: GroupId;
}
