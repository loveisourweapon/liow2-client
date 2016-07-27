import GroupsControlPanelController from './groups-control-panel.controller';
import groupsControlPanelTemplate from './groups-control-panel.html';

const GroupsControlPanelComponent = {
  bindings: {
    groups: '<',
    numberOfGroups: '<',
    query: '<',
    page: '<',
    pageSize: '<',
    title: '<browserTitle',
  },
  controller: GroupsControlPanelController,
  template: groupsControlPanelTemplate,
};

export default GroupsControlPanelComponent;
