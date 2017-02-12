import { Like } from './index';
import { Deed } from '../deed';
import { Campaign, Group } from '../group';
import { User } from '../user';

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
