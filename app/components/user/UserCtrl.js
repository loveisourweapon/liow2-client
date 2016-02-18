export default class UserCtrl {
  constructor($rootScope, $routeParams) {
    this.name = $routeParams.user;
    $rootScope.title = this.name;
  }
}

UserCtrl.$inject = ['$rootScope', '$routeParams'];
