export default class ConfirmEmailCtrl {
  /* @ngInject */
  constructor($rootScope, $location, Alertify, User) {
    Object.assign(this, { $rootScope, $location, Alertify, User });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = 'Confirming Email Address';

    this.User.confirmEmail(this.token)
      .then(() => this.Alertify.success('Confirmed email address'))
      .catch(() => this.Alertify.error('Failed confirming email address'))
      .then(() => this.$location.url('/'));
  }
}
