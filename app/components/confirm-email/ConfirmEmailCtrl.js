export default class ConfirmEmailCtrl {
  constructor($routeParams, $location, Alertify, User) {
    User.confirmEmail($routeParams.token)
      .then(() => Alertify.success('Confirmed email address'))
      .catch(() => Alertify.error('Failed confirming email address'))
      .then(() => $location.url('/'));
  }
}

ConfirmEmailCtrl.$inject = ['$routeParams', '$location', 'Alertify', 'User'];
