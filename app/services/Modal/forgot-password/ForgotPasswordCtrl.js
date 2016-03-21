export default class ForgotPasswordCtrl {
  constructor($uibModalInstance, $timeout, Alertify, User, email) {
    Object.assign(this, { $uibModalInstance, Alertify, User, email });

    // If email passed in, set the form field $dirty
    $timeout(() => email && this.form.email.$setDirty());
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

ForgotPasswordCtrl.$inject = ['$uibModalInstance', '$timeout', 'Alertify', 'User', 'email'];
