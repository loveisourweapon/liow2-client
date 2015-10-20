import angular from 'angular';

// Module dependencies
import ngSanitize from 'angular-sanitize';
import 'ui-select'; // Not browserified
import group from '../../services/group';

// Component dependencies
import NavbarCtrl from './NavbarCtrl';
import navbarTpl from './navbar.html';

export default angular.module('app.components.navbar', [ngSanitize, 'ui.select', group])
  .directive('navbar', () => {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: NavbarCtrl,
      controllerAs: 'navbar',
      template: navbarTpl
    };
  })
  .name;
