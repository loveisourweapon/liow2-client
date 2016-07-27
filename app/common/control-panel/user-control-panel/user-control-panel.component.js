import UserControlPanelController from './user-control-panel.controller';
import userControlPanelTemplate from './user-control-panel.html';

const UserControlPanelComponent = {
  bindings: {
    user: '<',
    title: '<browserTitle',
  },
  controller: UserControlPanelController,
  template: userControlPanelTemplate,
};

export default UserControlPanelComponent;
