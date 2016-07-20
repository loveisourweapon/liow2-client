import GroupController from './group.controller';
import groupTemplate from './group.html';

const GroupComponent = {
  bindings: {
    group: '<',
    setupCampaign: '<',
  },
  controller: GroupController,
  template: groupTemplate,
};

export default GroupComponent;
