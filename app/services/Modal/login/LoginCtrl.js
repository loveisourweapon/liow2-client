import _ from 'lodash';

export default class LoginCtrl {
  constructor($uibModalInstance, $routeParams, Alertify, User, Group, Modal, canSwitch) {
    Object.assign(this, { $uibModalInstance, Alertify, User, Group, Modal, canSwitch });

    this.error = null;
    this.joinGroup = null;
    if (_.has($routeParams, 'group')) {
      this.joinGroup = true;
    }
  }

  /**
   * Authenticate user with Facebook
   *
   * @param {boolean|null} joinGroup
   */
  authenticateFacebook(joinGroup) {
    let userData = {};
    if (joinGroup) {
      userData.group = this.Group.current._id;
    }

    this.loggingIn = true;
    this.User.authenticateFacebook(userData)
      .then(() => {
        if (joinGroup) {
          this.User.group = this.Group.current;
        }

        this.$uibModalInstance.close();
        this.Alertify.success('Signed in');
      })
      .catch(() => this.Alertify.error('Failed signing in'))
      .then(() => this.loggingIn = false);
  }

  /**
   * Authenticate user with email and password
   *
   * @param {string} email
   * @param {string} password
   */
  authenticateEmail(email, password) {
    this.loggingIn = true;
    this.User.authenticateEmail(email, password)
      .then(response => {
        this.$uibModalInstance.close();
        this.Alertify.success('Signed in' + (!response.data.confirmed ? '. Please confirm your email address' : ''));
      })
      .catch(response => this.error = response.data.message)
      .then(() => this.loggingIn = false);
  }

  /**
   * Send confirm email address email
   */
  sendConfirmEmail(email) {
    this.sending = true;
    this.User.sendConfirmEmail(email)
      .then(() => this.Alertify.success(`Sent confirmation email to <strong>${email}</strong>`))
      .catch(() => this.Alertify.error('Failed sending confirmation email'))
      .then(() => this.sending = false);
  }
}

LoginCtrl.$inject = ['$uibModalInstance', '$routeParams', 'Alertify', 'User', 'Group', 'Modal', 'canSwitch'];
