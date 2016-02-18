import _ from 'lodash';

export default class LoginCtrl {
  constructor($uibModalInstance, $routeParams, Alertify, User, Group) {
    Object.assign(this, { $uibModalInstance, $routeParams, Alertify, User, Group });

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

    this.User.authenticateFacebook(userData)
      .then(() => {
        if (joinGroup) {
          this.User.group = this.Group.current;
        }

        this.$uibModalInstance.close();
        this.Alertify.success('Signed in');
      })
      .catch(() => this.Alertify.error('Failed signing in'));
  }

  /**
   * Authenticate user with email and password
   *
   * @param {string} email
   * @param {string} password
   */
  authenticateEmail(email, password) {
    this.User.authenticateEmail(email, password)
      .then(() => {
        this.$uibModalInstance.close();
        this.Alertify.success('Signed in');
      })
      .catch(() => this.Alertify.error('Failed signing in'));
  }
}

LoginCtrl.$inject = ['$uibModalInstance', '$routeParams', 'Alertify', 'User', 'Group'];
