import { UserId } from './user.model';

export type GroupId = string;
export type GroupSlug = string;

export interface Group {
  _id: GroupId;
  name: string;
  urlName: GroupSlug;
  owner: string;
  contactNumber: string;
  admins: UserId[];
  country: string;
  logo: string;
  coverImage: string;
  welcomeMessage: string;
  approved: boolean;
  archived: boolean;
  created: Date;
  modified: Date;
}

export interface NewGroup {
  _id?: GroupId;
  name: string;
  contactNumber?: string;
  logo?: string;
  coverImage?: string;
  admins: string[];
  welcomeMessage?: string;
}
