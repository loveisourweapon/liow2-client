export default class ForgotPasswordCtrl {
  constructor($uibModalInstance, Alertify, User) {
    Object.assign(this, { $uibModalInstance, Alertify, User });
  }

  /**
   * Send email password recovery link
   *
   * @param {string} email
   */
  send(email) {
    this.sending = true;
    this.User.sendForgotPassword(email)
      .then(() => {
        this.$uibModalInstance.close();
        this.Alertify.success(`Sent password recovery email to <strong>${email}</strong>`);
      })
      .catch(() => this.Alertify.error('Failed sending password recovery email'))
      .then(() => this.sending = false);
  }
}

ForgotPasswordCtrl.$inject = ['$uibModalInstance', 'Alertify', 'User'];
