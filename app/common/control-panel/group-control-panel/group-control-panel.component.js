import GroupControlPanelController from './group-control-panel.controller';
import groupControlPanelTemplate from './group-control-panel.html';

const GroupControlPanelComponent = {
  bindings: {
    group: '<',
    numberOfMembers: '<',
    title: '<browserTitle',
  },
  controller: GroupControlPanelController,
  template: groupControlPanelTemplate,
};

export default GroupControlPanelComponent;
