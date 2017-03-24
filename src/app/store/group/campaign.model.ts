import { GroupId } from './index';
import { Deed, DeedId } from '../deed';

export type CampaignId = string;

export interface Campaign {
  _id: CampaignId;
  group: GroupId;
  dateStart: Date;
  dateEnd: Date;
  active: boolean;
  deeds: DeedPublish[];
  created: Date;
  modified: Date;
}

export interface NewCampaign {
  _id?: CampaignId;
  group: GroupId;
  deeds: Array<DeedPublish|DeedId>;
}

export interface DeedPublish {
  deed: Deed|DeedId;
  published?: boolean;
}
