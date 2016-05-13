export default class ConfirmEmailCtrl {
  /* @ngInject */
  constructor($rootScope, $routeParams, $location, Alertify, User) {
    $rootScope.title = 'Confirming Email Address';

    User.confirmEmail($routeParams.token)
      .then(() => Alertify.success('Confirmed email address'))
      .catch(() => Alertify.error('Failed confirming email address'))
      .then(() => $location.url('/'));
  }
}
