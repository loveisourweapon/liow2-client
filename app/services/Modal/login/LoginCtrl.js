export default class LoginCtrl {
  constructor($uibModalInstance, User) {
    Object.assign(this, { $uibModalInstance, User });
  }

  /**
   * Authenticate user with Facebook
   */
  authenticateFacebook() {
    this.User.authenticateFacebook().then(() => this.$uibModalInstance.close());
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

LoginCtrl.$inject = ['$uibModalInstance', 'User'];
