export default class HomeCtrl {
  constructor($rootScope, User) {
    Object.assign(this, { User });

    $rootScope.title = null;
  }
}

HomeCtrl.$inject = ['$rootScope', 'User'];
