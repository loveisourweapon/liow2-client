import UsersControlPanelController from './users-control-panel.controller';
import usersControlPanelTemplate from './users-control-panel.html';

const UsersControlPanelComponent = {
  bindings: {
    users: '<',
    query: '<',
  },
  controller: UsersControlPanelController,
  template: usersControlPanelTemplate,
};

export default UsersControlPanelComponent;
