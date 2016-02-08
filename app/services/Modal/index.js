import angular from 'angular';

// Module dependencies
import uibs from 'angular-ui-bootstrap';
import 'angular-ui-switch'; // Not browserified
import ngRoute from 'angular-route';
import User from '../../services/User';
import Group from '../../services/Group';

// Login modal
import LoginCtrl from './login/LoginCtrl';
import loginTpl from './login/login.html';

class Modal {
  constructor($uibModal, $q) {
    Object.assign(this, { $uibModal, $q });
  }

  /**
   * Open the login modal
   *
   * @returns {Promise}
   */
  openLogin() {
    return this.$uibModal.open({
      controller: LoginCtrl,
      controllerAs: 'Login',
      template: loginTpl,
      size: 'sm'
    }).result;
  }
}
Modal.$inject = ['$uibModal', '$q'];

export default angular.module('app.services.Modal', [uibs, 'uiSwitch', ngRoute, User, Group])
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
