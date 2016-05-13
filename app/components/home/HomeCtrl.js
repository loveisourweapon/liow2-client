export default class HomeCtrl {
  /* @ngInject */
  constructor($rootScope, User, Modal) {
    Object.assign(this, { User, Modal });

    $rootScope.title = null;
  }
}
