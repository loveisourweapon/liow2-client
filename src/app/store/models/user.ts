import { Group } from './group';

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

export type UserId = string;
