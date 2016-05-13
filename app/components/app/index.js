import angular from 'angular';

// Module dependencies
import ngRoute from 'angular-route';
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
  resetPassword
])
  .component('app', {
    controller: AppCtrl,
    template: appTpl
  })
  .config([
    '$compileProvider',
    '$httpProvider',
    '$routeProvider',
    '$locationProvider',
    'uiSelectConfig',
    (
      $compileProvider,
      $httpProvider,
      $routeProvider,
      $locationProvider,
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
        .otherwise('/');

      $compileProvider.debugInfoEnabled(false);
      $httpProvider.useApplyAsync(true);
      $locationProvider.html5Mode(true);

      uiSelectConfig.theme = 'bootstrap';
      uiSelectConfig.appendToBody = true;
    }
  ])
  .name;
