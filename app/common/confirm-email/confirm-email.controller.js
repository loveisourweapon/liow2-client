class ConfirmEmailController {
  /* @ngInject */
  constructor($rootScope, $state, Alertify, User) {
    Object.assign(this, { $rootScope, $state, Alertify, User });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = 'Confirming Email Address';

    this.User.confirmEmail(this.token)
      .then(() => this.Alertify.success('Confirmed email address'))
      .catch(() => this.Alertify.error('Failed confirming email address'))
      .then(() => this.$state.go('home'));
  }
}

export default ConfirmEmailController;
