class DeedsControlPanelController {
  /* @ngInject */
  constructor($rootScope, Modal) {
    Object.assign(this, { $rootScope, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = 'Deeds | Control Panel';
  }

  /**
   * Component bindings updated
   *
   * @param {object} changes
   */
  $onChanges(changes) {
    if (changes.deeds) {
      this.deeds = angular.copy(this.deeds);
    }
  }
}

export default DeedsControlPanelController;
