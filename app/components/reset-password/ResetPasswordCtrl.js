export default class ResetPasswordCtrl {
  /* @ngInject */
  constructor($rootScope, $routeParams, $location, Alertify, User, Modal) {
    Object.assign(this, { $routeParams, $location, Alertify, User, Modal });

    $rootScope.title = 'Reset Password';
  }

  /**
   * Save the user's new password
   *
   * @param {string} password
   * @param {string} token
   */
  save(password, token) {
    this.saving = true;
    this.User.resetPassword(password, token)
      .then(() => this.Alertify.success('Password reset'))
      .catch(() => this.Alertify.error('Password reset link has expired'))
      .then(() => this.Modal.openLogin() && this.$location.url('/'));
  }
}
