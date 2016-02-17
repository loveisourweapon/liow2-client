import angular from 'angular';

// Module dependencies
import User from '../../services/User';
import Group from '../../services/Group';
import Act from '../../services/Act';
import Modal from '../../services/Modal';

// Component dependencies
import WelcomeCtrl from './WelcomeCtrl';
import welcomeTpl from './welcome.html';

export default angular.module('app.components.welcome', [
  User,
  Group,
  Act,
  Modal
])
  .component('welcome', {
    controller: WelcomeCtrl,
    template: welcomeTpl
  })
  .name;
