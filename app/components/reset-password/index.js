import angular from 'angular';

// Module dependencies
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import jumbotron from '../jumbotron';
import directives from '../../directives';

// Component dependencies
import ResetPasswordCtrl from './ResetPasswordCtrl';
import resetPasswordTpl from './resetPassword.html';

export default angular.module('app.component.resetPassword', [
  Alertify,
  User,
  jumbotron,
  directives
])
  .component('resetPassword', {
    controller: ResetPasswordCtrl,
    template: resetPasswordTpl,
    bindings: {
      token: '<'
    }
  })
  .name;
