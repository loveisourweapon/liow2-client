export type DeedId = string;
export type DeedSlug = string;

export interface Deed {
  _id: DeedId;
  title: string;
  urlTitle: DeedSlug;
  content: string;
  logo: string;
  videoUrl: string;
  coverImage: string;
  created: Date;
  modified: Date;
}
