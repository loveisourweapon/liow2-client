export default class HomeCtrl {
  constructor($rootScope) {
    $rootScope.title = null;
  }
}

HomeCtrl.$inject = ['$rootScope'];
