import angular from 'angular';

// Module dependencies
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import uiSelect from 'ui-select';
import navbar from '../navbar';

// Router dependencies
import home from '../home';
import controlPanel from '../control-panel';
import globalFeed from '../global-feed';
import deed from '../deed';
import group from '../group';
import user from '../user';
import confirmEmail from '../confirm-email';
import resetPassword from '../reset-password';

// Component dependencies
import AppCtrl from './AppCtrl';
import appTpl from './app.html';

export default angular.module('app', [
  ngRoute,
  uiSelect,
  navbar,
  home,
  controlPanel,
  globalFeed,
  deed,
  group,
  user,
  confirmEmail,
  resetPassword
])
  .component('app', {
    controller: AppCtrl,
    template: appTpl
  })
  .config(/* @ngInject */(
    $compileProvider,
    $httpProvider,
    $routeProvider,
    $locationProvider,
    $animateProvider,
    uiSelectConfig
  ) => {
    $routeProvider
      .when('/', {
        template: '<home></home>'
      })
      .when('/control-panel', {
        template: '<control-panel></control-panel>'
      })
      .when('/global', {
        template: '<global-feed></global-feed>'
      })
      .when('/d/:deed', {
        template: '<deed></deed>'
      })
      .when('/g/:group', {
        template: '<group></group>'
      })
      .when('/u/:user', {
        template: '<user></user>'
      })
      .when('/confirm/:token', {
        template: '<confirm-email></confirm-email>'
      })
      .when('/reset/:token', {
        template: '<reset-password></reset-password>'
      })
      .otherwise('/');

    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
    $locationProvider.html5Mode(true);
    $animateProvider.classNameFilter(/^((?!(fa)).)*$/);

    uiSelectConfig.theme = 'bootstrap';
    uiSelectConfig.appendToBody = true;
  })
  .name;
