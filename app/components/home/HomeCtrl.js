export default class HomeCtrl {
  constructor($rootScope, User, Modal) {
    Object.assign(this, { User, Modal });

    $rootScope.title = null;
  }
}

HomeCtrl.$inject = ['$rootScope', 'User', 'Modal'];
