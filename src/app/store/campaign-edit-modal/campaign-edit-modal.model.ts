import { Campaign, Group } from '../group';

export class CampaignEditAction {
  static readonly Create = 'Create';
  static readonly Update = 'Update';
}

export interface CampaignEditInitialise {
  action: CampaignEditAction;
  group: Group;
  campaign?: Campaign;
}
