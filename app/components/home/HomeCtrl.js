export default class HomeCtrl {
  /* @ngInject */
  constructor($rootScope, User, Modal) {
    Object.assign(this, { $rootScope, User, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = null;
  }
}
