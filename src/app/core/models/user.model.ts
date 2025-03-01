import { Group, GroupId } from './';

export type UserId = string;

export interface User {
  _id: UserId;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  picture: string;
  coverImage: string;
  country: string;
  confirmed: boolean;
  superAdmin: boolean;
  groups: Group[];
  currentGroup: GroupId;
  created: Date;
  modified: Date;
  lastSeen: Date;
}

export interface NewUser {
  _id?: UserId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
  marketingOptIn: boolean;
  picture?: string;
  groups?: string[];
}
