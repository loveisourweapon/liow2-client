import UserController from './user.controller';
import userTemplate from './user.html';

const UserComponent = {
  bindings: {
    user: '<',
  },
  controller: UserController,
  template: userTemplate,
};

export default UserComponent;
