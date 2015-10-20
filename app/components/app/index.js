import angular from 'angular';

// Module dependencies
import ngRoute from 'angular-route';
import 'ui-select'; // Not browserified
import navbar from '../navbar';

// Router dependencies
import { home, homeTpl } from '../home';
import { group, groupTpl } from '../group';

// Component dependencies
import AppCtrl from './AppCtrl';
import appTpl from './app.html';

export default angular.module('app', [ngRoute, 'ui.select', navbar, home, group])
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
  .config([
    '$routeProvider',
    '$locationProvider',
    'uiSelectConfig',
    ($routeProvider, $locationProvider, uiSelectConfig) => {
      $routeProvider
        .when('/', {
          controller: 'HomeCtrl',
          controllerAs: 'home',
          template: homeTpl
        })
        .when('/g/:group', {
          controller: 'GroupCtrl',
          controllerAs: 'group',
          template: groupTpl
        });

      $locationProvider.html5Mode(true);

      uiSelectConfig.theme = 'bootstrap';
    }
  ])
  .name;
