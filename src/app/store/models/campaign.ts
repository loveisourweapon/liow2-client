import { Deed, Group } from './index';

export interface Campaign {
  group: Group;
  dateState: Date;
  dateEnd: Date;
  active: boolean;
  deeds: DeedPublish[];
  created: Deed;
  modified: Deed;
}

export interface DeedPublish {
  deed: Deed;
  published: boolean;
}
