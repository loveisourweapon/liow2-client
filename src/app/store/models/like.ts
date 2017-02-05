import { Act, Campaign, Comment, Group, User } from './index';

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
