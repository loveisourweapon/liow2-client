import angular from 'angular';

// Module dependencies
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import uiSelect from 'ui-select';
import navbar from '../navbar';

// Router dependencies
import { home, homeTpl } from '../home';
import { globalFeed, globalFeedTpl } from '../global-feed';
import { deed, deedTpl } from '../deed';
import { group, groupTpl } from '../group';
import { user, userTpl } from '../user';
import { confirmEmail, confirmEmailTpl } from '../confirm-email';
import { resetPassword, resetPasswordTpl } from '../reset-password';
import { controlPanel, controlPanelTpl } from '../control-panel';

// Component dependencies
import AppCtrl from './AppCtrl';
import appTpl from './app.html';

export default angular.module('app', [
  ngRoute,
  uiSelect,
  navbar,
  home,
  globalFeed,
  deed,
  group,
  user,
  confirmEmail,
  resetPassword,
  controlPanel
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
        controller: 'HomeCtrl',
        controllerAs: '$ctrl',
        template: homeTpl
      })
      .when('/global', {
        controller: 'GlobalFeedCtrl',
        controllerAs: '$ctrl',
        template: globalFeedTpl
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
      .when('/u/:user', {
        controller: 'UserCtrl',
        controllerAs: '$ctrl',
        template: userTpl
      })
      .when('/confirm/:token', {
        controller: 'ConfirmEmailCtrl',
        controllerAs: '$ctrl',
        template: confirmEmailTpl
      })
      .when('/reset/:token', {
        controller: 'ResetPasswordCtrl',
        controllerAs: '$ctrl',
        template: resetPasswordTpl
      })
      .when('/control-panel', {
        controller: 'ControlPanelCtrl',
        controllerAs: '$ctrl',
        template: controlPanelTpl
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
