import { Act, Campaign, CampaignId, Comment, Deed, DeedId, Group, GroupId, User, UserId } from './';

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
  campaign?: CampaignId;
  group?: GroupId;
  user?: UserId;
  'target.deed'?: DeedId;
  'target.group'?: GroupId;
  operator?: FeedJoinOperator;
}

export class FeedJoinOperator {
  static readonly And = '$and';
  static readonly Or = '$or';
}
