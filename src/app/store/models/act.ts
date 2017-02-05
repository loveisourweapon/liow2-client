import { Campaign, Comment, Deed, Group, Like, User } from './index';

export interface Act {
  _id: string;
  user: User;
  deed: Deed;
  group: Group;
  campaign: Campaign;
  likes: Like[];
  comments: Comment[];
  created: Date;
}
