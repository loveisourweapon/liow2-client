import angular from 'angular';

// Module dependencies
import ngRoute from 'angular-route';
import 'ui-select'; // Not browserified
import navbar from '../navbar';

// Router dependencies
import { home, homeTpl } from '../home';
import { deed, deedTpl } from '../deed';
import { group, groupTpl } from '../group';
import { user, userTpl } from '../user';

// Component dependencies
import AppCtrl from './AppCtrl';
import appTpl from './app.html';

export default angular.module('app', [ngRoute, 'ui.select', navbar, home, deed, group, user])
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
          controllerAs: 'Home',
          template: homeTpl
        })
        .when('/d/:deed', {
          controller: 'DeedCtrl',
          controllerAs: 'Deed',
          template: deedTpl
        })
        .when('/g/:group', {
          controller: 'GroupCtrl',
          controllerAs: 'GroupCtrl',
          template: groupTpl
        })
        .when('/u/:user', {
          controller: 'UserCtrl',
          controllerAs: 'User',
          template: userTpl
        })
        .otherwise('/');

      $locationProvider.html5Mode(true);

      uiSelectConfig.theme = 'bootstrap';
    }
  ])
  .name;
