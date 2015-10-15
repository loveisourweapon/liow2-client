import angular from 'angular';
import ngRoute from 'angular-route';

// Module dependencies
import navbar from '../navbar';

// Router dependencies
import { home, homeTpl } from '../home';

// Component dependencies
import AppCtrl from './AppCtrl';
import appTpl from './app.html';

export default angular.module('app', [ngRoute, navbar, home])
  .directive('app', () => {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: AppCtrl,
      controllerAs: 'app',
      template: appTpl
    };
  })
  .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        controllerAs: 'home',
        template: homeTpl
      });

    $locationProvider.html5Mode(true);
  }])
  .name;
