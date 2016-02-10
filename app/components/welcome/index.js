import angular from 'angular';

// Module dependencies
import Modal from '../../services/Modal';

// Component dependencies
import WelcomeCtrl from './WelcomeCtrl';
import welcomeTpl from './welcome.html';

export default angular.module('app.components.welcome', [Modal])
  .component('welcome', {
    controller: WelcomeCtrl,
    template: welcomeTpl
  })
  .name;
