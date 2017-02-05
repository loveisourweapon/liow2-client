import { Act, Campaign, Deed, Group, Like, User } from './index';

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
