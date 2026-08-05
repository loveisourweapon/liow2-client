import { Act, ActId, Campaign, Deed, DeedId, Group, GroupId, Like, User, UserId } from './';

export type CommentId = string;

export type CommentStatus = 'pending' | 'approved' | 'rejected';

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
  // Comments predating approval have no status, and are treated as approved
  status?: CommentStatus;
  approvedBy?: UserId;
  approvedAt?: Date;
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
