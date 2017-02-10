import { Group } from './group';

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
  created: Date;
  modified: Date;
  lastSeen: Date;
}

export interface NewUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  picture?: string;
  groups?: string[];
}
