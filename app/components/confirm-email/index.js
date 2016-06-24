import angular from 'angular';

// Module dependencies
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import jumbotron from '../jumbotron';

// Component dependencies
import ConfirmEmailCtrl from './ConfirmEmailCtrl';
import confirmEmailTpl from './confirmEmail.html';

export default angular.module('app.component.confirmEmail', [
  Alertify,
  User,
  jumbotron
])
  .component('confirmEmail', {
    controller: ConfirmEmailCtrl,
    template: confirmEmailTpl
  })
  .name;
