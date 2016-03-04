import angular from 'angular';

// Module dependencies
import ngRoute from 'angular-route';
import uiSelect from 'ui-select';
import navbar from '../navbar';

// Router dependencies
import { home, homeTpl } from '../home';
import { deed, deedTpl } from '../deed';
import { group, groupTpl } from '../group';

// Component dependencies
import AppCtrl from './AppCtrl';
import appTpl from './app.html';

export default angular.module('app', [
  ngRoute,
  uiSelect,
  navbar,
  home,
  deed,
  group
])
  .component('app', {
    controller: AppCtrl,
    template: appTpl
  })
  .config([
    '$routeProvider',
    '$locationProvider',
    'uiSelectConfig',
    ($routeProvider, $locationProvider, uiSelectConfig) => {
      $routeProvider
        .when('/', {
          controller: 'HomeCtrl',
          controllerAs: '$ctrl',
          template: homeTpl
        })
        .when('/d/:deed', {
          controller: 'DeedCtrl',
          controllerAs: '$ctrl',
          template: deedTpl
        })
        .when('/g/:group', {
          controller: 'GroupCtrl',
          controllerAs: '$ctrl',
          template: groupTpl
        })
        .otherwise('/');

      $locationProvider.html5Mode(true);

      uiSelectConfig.theme = 'bootstrap';
      uiSelectConfig.appendToBody = true;
    }
  ])
  .name;
