import UsersControlPanelController from './users-control-panel.controller';
import usersControlPanelTemplate from './users-control-panel.html';

const UsersControlPanelComponent = {
  bindings: {
    users: '<',
    numberOfUsers: '<',
    query: '<',
    page: '<',
    pageSize: '<',
  },
  controller: UsersControlPanelController,
  template: usersControlPanelTemplate,
};

export default UsersControlPanelComponent;
