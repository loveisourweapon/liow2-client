import { GroupId } from './index';
import { Deed, DeedId } from '../deed';

export interface Campaign {
  _id: string;
  group: GroupId;
  dateStart: Date;
  dateEnd: Date;
  active: boolean;
  deeds: DeedPublish[];
  created: Date;
  modified: Date;
}

export interface NewCampaign {
  group: GroupId;
  deeds: Array<DeedPublish|DeedId>;
}

export interface DeedPublish {
  deed: Deed|DeedId;
  published?: boolean;
}
