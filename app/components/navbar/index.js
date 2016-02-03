import angular from 'angular';

// Module dependencies
import ngSanitize from 'angular-sanitize';
import 'ui-select'; // Not browserified
import Group from '../../services/Group';
import Modal from '../../services/Modal';

// Component dependencies
import NavbarCtrl from './NavbarCtrl';
import navbarTpl from './navbar.html';

export default angular.module('app.components.navbar', [ngSanitize, 'ui.select', Group, Modal])
  .directive('navbar', () => {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: NavbarCtrl,
      controllerAs: 'NavbarCtrl',
      template: navbarTpl
    };
  })
  .name;
