import { Group } from './index';
import { Deed } from '../deed';

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
