import { Campaign, Deed, Like, Group, User } from './';

export type ActId = string;

export interface Act {
  _id: ActId;
  user: User;
  deed: Deed;
  group: Group;
  campaign: Campaign;
  likes: Like[];
  comments: Comment[];
  created: Date;
}
