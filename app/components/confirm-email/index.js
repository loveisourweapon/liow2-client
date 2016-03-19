import angular from 'angular';

// Module dependencies
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import jumbotron from '../jumbotron';

// Component dependencies
import ConfirmEmailCtrl from './ConfirmEmailCtrl';
import template from './confirmEmail.html';
export let confirmEmailTpl = template;

export let confirmEmail = angular.module('app.component.confirmEmail', [
  Alertify,
  User,
  jumbotron
])
  .controller('ConfirmEmailCtrl', ConfirmEmailCtrl)
  .name;
