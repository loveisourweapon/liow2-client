export default class UserCtrl {
  constructor($routeParams) {
    console.log('UserCtrl', $routeParams);

    this.name = $routeParams.user;
  }
}

UserCtrl.$inject = ['$routeParams'];
