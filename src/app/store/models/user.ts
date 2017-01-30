import { Group } from './group';

export interface User {
  _id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  picture: string;
  country: string;
  confirmed: boolean;
  superAdmin: boolean;
  groups: Group[];
  created: Date;
  modified: Date;
  lastSeen: Date;
}
