import _ from 'lodash';
import angular from 'angular';

// Module dependencies
import uibs from 'angular-ui-bootstrap';
import 'angular-ui-switch'; // Not browserified
import ngRoute from 'angular-route';
import lodashFilters from '../../filters/lodash';
import User from '../../services/User';
import Group from '../../services/Group';

// Login modal
import LoginCtrl from './login/LoginCtrl';
import loginTpl from './login/login.html';

// Group edit modal
import GroupEditCtrl from './group-edit/GroupEditCtrl';
import groupEditTpl from './group-edit/group-edit.html';

class Modal {
  constructor($uibModal, $q) {
    Object.assign(this, { $uibModal, $q });

    this.defaults = {
      controllerAs: '$ctrl',
      size: 'md'
    };
  }

  /**
   * Open the login modal
   *
   * @returns {Promise}
   */
  openLogin() {
    return this.$uibModal.open(_.defaults({
      controller: LoginCtrl,
      template: loginTpl,
      size: 'sm'
    }, this.defaults)).result;
  }

  /**
   * Open the group edit modal
   *
   * @param {string} [action='create']
   * @param {object} [group=null]
   *
   * @returns {Promise}
   */
  openGroupEdit(action = 'create', group = null) {
    return this.$uibModal.open(_.defaults({
      controller: GroupEditCtrl,
      template: groupEditTpl,
      resolve: {
        action: this.$q.resolve(action),
        group: this.$q.resolve(angular.copy(group))
      }
    }, this.defaults)).result;
  }
}

Modal.$inject = ['$uibModal', '$q'];

export default angular.module('app.services.Modal', [uibs, 'uiSwitch', ngRoute, lodashFilters, User, Group])
  .service('Modal', Modal)
  .name;

// Fixes to UI Bootstrap Modal
angular.module(uibs).directive('uibModalWindow', ['$window', $window => {
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
