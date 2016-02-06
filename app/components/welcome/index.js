import angular from 'angular';

// Module dependencies
import Modal from '../../services/Modal';

import WelcomeCtrl from './WelcomeCtrl';
import welcomeTpl from './welcome.html';

export default angular.module('app.components.welcome', [Modal])
  .directive('welcome', () => {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: WelcomeCtrl,
      controllerAs: 'WelcomeCtrl',
      template: welcomeTpl
    };
  })
  .name;
