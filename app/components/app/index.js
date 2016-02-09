import angular from 'angular';

// Module dependencies
import ngRoute from 'angular-route';
import uiSelect from 'ui-select';
import navbar from '../navbar';

// Router dependencies
import { home, homeTpl } from '../home';
import { deed, deedTpl } from '../deed';
import { group, groupTpl } from '../group';
import { user, userTpl } from '../user';

// Component dependencies
import AppCtrl from './AppCtrl';
import appTpl from './app.html';

export default angular.module('app', [ngRoute, uiSelect, navbar, home, deed, group, user])
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
      uiSelectConfig.appendToBody = true;
    }
  ])
  .name;

// Temporary workaround for adding classes to broken ui-select directives under angular 1.5.0
angular.module(uiSelect).config(['$provide', $provide => {
  function decorateDirectiveWithClass(directive, className) {
    $provide.decorator(directive, ['$delegate', $delegate => {
      let directive = $delegate[0],
        templateUrl = directive.templateUrl;

      directive.templateUrl = tElement => {
        tElement.addClass(className);
        return templateUrl(tElement);
      };

      return $delegate;
    }]);
  }

  decorateDirectiveWithClass('uiSelectChoicesDirective', 'ui-select-choices');
  decorateDirectiveWithClass('uiSelectMatchDirective', 'ui-select-match');
}]);
