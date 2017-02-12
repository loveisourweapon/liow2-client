import { Act, Comment } from '../act';
import { Deed } from '../deed';
import { Campaign, Group } from '../group';
import { User } from '../user';

export interface FeedItem {
  _id: string;
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
  'group'?: string;
  'user'?: string;
  'target.deed'?: string;
  'target.group'?: string;
}
