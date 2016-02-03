import angular from 'angular';
import uibs from 'angular-ui-bootstrap';

// Test modal
import TestCtrl from './test/TestCtrl';
import testTpl from './test/test.html';

class Modal {
  constructor($uibModal, $q) {
    Object.assign(this, { $uibModal, $q });
  }

  /**
   * Test opening a modal
   *
   * @returns {Promise}
   */
  openTest() {
    return this.$uibModal.open({
      controller: TestCtrl,
      controllerAs: 'Test',
      template: testTpl,
      size: 'md',
      resolve: {}
    }).result;
  }
}
Modal.$inject = ['$uibModal', '$q'];

export default angular.module('app.services.Modal', [uibs])
  .service('Modal', Modal)
  .name;

// Fixes to UI Bootstrap Modal
angular.module(uibs).directive('uibModalWindow', ['$window', ($window) => {
  return {
    priority: 1,
    link: (scope, element) => {
      // Set max-height on modal-body
      let window = angular.element($window);
      window.on('resize', setMaxHeight);
      scope.$on('$destroy', () => window.off('resize', setMaxHeight));
      setMaxHeight();

      function setMaxHeight() {
        element
          .find('.modal-body')
          .css({
            maxHeight: window.height() * 0.85 - 80,
            overflowY: 'auto'
          });
      }
    }
  }
}]);
