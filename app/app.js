import angular from 'angular';
import AppComponent from './app.component';

// Module dependencies
import ngRoute from 'angular-route';
import uiSelect from 'ui-select';
import Common from './common';
import Components from './components';

const app = angular
  .module('app', [
    ngRoute,
    uiSelect,
    Common,
    Components,
  ])
  .component('app', AppComponent)
  .value('EventEmitter', payload => ({ $event: payload}))
  .config((
    $compileProvider,
    $httpProvider,
    $routeProvider,
    $locationProvider,
    $animateProvider,
    uiSelectConfig
  ) => {
    'ngInject';

    $routeProvider
      .when('/', {
        template: '<home></home>',
      })
      .when('/control-panel/:view', {
        template: '<control-panel view="$resolve.view"></control-panel>',
        resolve: {
          view: /* @ngInject */ $route => $route.current.params.view
        }
      })
      .when('/control-panel', {
        redirectTo: '/control-panel/user',
      })
      .when('/global', {
        template: '<global-feed></global-feed>',
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
  });

export default app;
