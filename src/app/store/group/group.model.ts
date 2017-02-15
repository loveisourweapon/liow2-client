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
