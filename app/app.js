import angular from 'angular';
import AppComponent from './app.component';

// Module dependencies
import angularDragula from 'angular-dragula';
import angularInView from 'angular-inview';
import angularMarked from 'angular-marked';
import ngMessages from 'angular-messages';
import ngSanitize from 'angular-sanitize';
import uibs from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import 'angular-ui-switch'; // Not browserified
import angularYoutube from 'angular-youtube-embed';
import satellizer from 'satellizer';
import uiSelect from 'ui-select';
import Common from './common';
import Components from './components';

const app = angular
  .module('app', [
    angularDragula(angular),
    angularInView.name,
    angularMarked,
    ngMessages,
    ngSanitize,
    uibs,
    uiRouter,
    'uiSwitch',
    angularYoutube,
    satellizer,
    uiSelect,
    Common,
    Components,
  ])
  .component('app', AppComponent)
  .value('EventEmitter', payload => ({ $event: payload}))
  .config((
    $compileProvider,
    $httpProvider,
    $urlRouterProvider,
    $locationProvider,
    $animateProvider,
    uiSelectConfig
  ) => {
    'ngInject';

    $urlRouterProvider.otherwise('/');
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
    $locationProvider.html5Mode(true);
    $animateProvider.classNameFilter(/^((?!(fa)).)*$/);

    uiSelectConfig.theme = 'bootstrap';
    uiSelectConfig.appendToBody = true;
  });

export default app;
