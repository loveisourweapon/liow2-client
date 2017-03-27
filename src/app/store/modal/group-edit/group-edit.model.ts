import { Group } from '../../group';

export class GroupEditAction {
  static readonly Create = 'Create';
  static readonly Update = 'Update';
}

export interface GroupEditInitialise {
  action: GroupEditAction;
  group?: Group;
}
