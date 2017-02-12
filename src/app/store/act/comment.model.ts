import { Act, Like } from './index';
import { Deed } from '../deed';
import { Campaign, Group } from '../group';
import { User } from '../user';

export interface Comment {
  user: User;
  group: Group;
  campaign: Campaign;
  target: {
    group: Group;
    deed: Deed;
    act: Act;
    comment: Comment;
  };
  content: {
    text: string;
    image: string;
  };
  likes: Like[];
  comments: Comment[];
  created: Date;
  modified: Date;
}
