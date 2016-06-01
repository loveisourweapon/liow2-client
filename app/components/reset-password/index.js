import angular from 'angular';

// Module dependencies
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import jumbotron from '../jumbotron';
import directives from '../../directives';

// Component dependencies
import ResetPasswordCtrl from './ResetPasswordCtrl';
import template from './resetPassword.html';
export let resetPasswordTpl = template;

export let resetPassword = angular.module('app.component.resetPassword', [
  Alertify,
  User,
  jumbotron,
  directives
])
  .controller('ResetPasswordCtrl', ResetPasswordCtrl)
  .name;
