import angular from 'angular';

class GroupsControlPanelController {
  /* @ngInject */
  constructor($rootScope, $state, Modal) {
    Object.assign(this, { $rootScope, $state, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = 'Groups | Control Panel';
  }

  /**
   * Component bindings updated
   *
   * @param {object} changes
   */
  $onChanges(changes) {
    if (changes.groups) {
      this.groups = angular.copy(this.groups);
    }
  }

  /**
   * Updated search query
   *
   * @param {object} $event
   */
  onSearch($event) {
    this.$state.go('.', { query: $event.query, page: 1 });
  }

  /**
   * Changed to a new pagination page
   *
   * @param {number} page
   */
  onPaginationChange(page) {
    this.$state.go('.', { page });
  }
}

export default GroupsControlPanelController;
