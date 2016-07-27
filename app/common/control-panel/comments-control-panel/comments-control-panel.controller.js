import angular from 'angular';

class CommentsControlPanelController {
  /* @ngInject */
  constructor($rootScope, $state, User) {
    Object.assign(this, { $rootScope, $state, User });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = `${this.title || 'Comments'} | Control Panel`;
  }

  /**
   * Component bindings updated
   *
   * @param {object} changes
   */
  $onChanges(changes) {
    if (changes.comments) {
      this.comments = angular.copy(this.comments);
    }
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

export default CommentsControlPanelController;
