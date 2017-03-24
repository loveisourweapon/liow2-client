export type GroupId = string;
export type GroupSlug = string;

export interface Group {
  _id: GroupId;
  name: string;
  urlName: GroupSlug;
  owner: string;
  admins: string[];
  country: string;
  logo: string;
  coverImage: string;
  welcomeMessage: string;
  created: Date;
  modified: Date;
}

export interface NewGroup {
  _id?: GroupId;
  name: string;
  logo?: string;
  coverImage?: string;
  admins: string[];
  welcomeMessage?: string;
}
