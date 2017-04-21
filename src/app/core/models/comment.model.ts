import { Act, ActId, Campaign, Deed, DeedId, Group, GroupId, Like, User } from './';

export type CommentId = string;

export interface Comment {
  _id: CommentId;
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

export interface NewComment {
  _id?: CommentId;
  group?: GroupId;
  target: {
    group?: GroupId,
    deed?: DeedId,
    act?: ActId,
    comment?: CommentId,
  };
  content: {
    text: string;
  };
}
