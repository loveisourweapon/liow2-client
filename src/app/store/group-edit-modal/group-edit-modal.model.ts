import { Group } from '../group';

export class GroupEditAction {
  static readonly CREATE = 'Create';
  static readonly EDIT = 'Edit';
}

export interface GroupEditInitialise {
  action: GroupEditAction;
  group?: Group;
}
