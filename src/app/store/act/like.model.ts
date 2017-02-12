import { Act, Comment } from './index';
import { Campaign, Group } from '../group';
import { User } from '../user';

export interface Like {
  user: User;
  group: Group;
  campaign: Campaign;
  target: {
    act: Act;
    comment: Comment;
  };
  created: Date;
}
