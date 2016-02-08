import _ from 'lodash';

export default class LoginCtrl {
  constructor($uibModalInstance, $routeParams, User, Group) {
    Object.assign(this, { $uibModalInstance, $routeParams, User, Group });

    this.joinGroup = null;
    if (_.has($routeParams, 'group')) {
      this.joinGroup = true;
    }
  }

  /**
   * Authenticate user with Facebook
   *
   * @param {boolean} joinGroup
   */
  authenticateFacebook(joinGroup) {
    let userData = {};
    if (joinGroup) {
      userData.group = this.Group.current._id;
    }

    this.User.authenticateFacebook(userData).then(() => this.$uibModalInstance.close());
  }

  /**
   * Authenticate user with email and password
   *
   * @param {string} email
   * @param {string} password
   */
  authenticateEmail(email, password) {
    this.User.authenticateEmail().then(() => this.$uibModalInstance.close());
  }
}

LoginCtrl.$inject = ['$uibModalInstance', '$routeParams', 'User', 'Group'];
