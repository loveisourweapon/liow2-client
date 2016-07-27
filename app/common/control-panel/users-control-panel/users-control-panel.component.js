import UsersControlPanelController from './users-control-panel.controller';
import usersControlPanelTemplate from './users-control-panel.html';

const UsersControlPanelComponent = {
  bindings: {
    users: '<',
    numberOfUsers: '<',
    query: '<',
    page: '<',
    pageSize: '<',
    title: '<browserTitle',
  },
  controller: UsersControlPanelController,
  template: usersControlPanelTemplate,
};

export default UsersControlPanelComponent;
