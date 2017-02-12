export interface Group {
  _id: string;
  name: string;
  urlName: string;
  owner: string;
  admins: string[];
  country: string;
  logo: string;
  coverImage: string;
  welcomeMessage: string;
  created: Date;
  modified: Date;
}
