export default class UserCtrl {
  constructor($routeParams) {
    this.name = $routeParams.user;
  }
}

UserCtrl.$inject = ['$routeParams'];
