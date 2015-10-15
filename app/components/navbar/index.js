import angular from 'angular';

// Component dependencies
import NavbarCtrl from './NavbarCtrl';
import navbarTpl from './navbar.html';

export default angular.module('app.components.navbar', [])
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
