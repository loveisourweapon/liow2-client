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
      .when('/control-panel/:view', {
        template: '<control-panel view="$resolve.view"></control-panel>',
        resolve: {
          view: /* @ngInject */ $route => $route.current.params.view
        }
      })
      .when('/control-panel', {
        redirectTo: '/control-panel/user'
      })
      .when('/global', {
        template: '<global-feed></global-feed>'
      })
      .when('/d/:deedSlug', {
        template: '<deed deed-slug="$resolve.deedSlug"></deed>',
        resolve: {
          deedSlug: /* @ngInject */ $route => $route.current.params.deedSlug
        }
      })
      .when('/g/:groupSlug', {
        template: '<group group-slug="$resolve.groupSlug"></group>',
        resolve: {
          groupSlug: /* @ngInject */ $route => $route.current.params.groupSlug
        }
      })
      .when('/u/:userId', {
        template: '<user user-id="$resolve.userId"></user>',
        resolve: {
          userId: /* @ngInject */ $route => $route.current.params.userId
        }
      })
      .when('/confirm/:token', {
        template: '<confirm-email token="$resolve.token"></confirm-email>',
        resolve: {
          token: /* @ngInject */ $route => $route.current.params.token
        }
      })
      .when('/reset/:token', {
        template: '<reset-password token="$resolve.token"></reset-password>',
        resolve: {
          token: /* @ngInject */ $route => $route.current.params.token
        }
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
