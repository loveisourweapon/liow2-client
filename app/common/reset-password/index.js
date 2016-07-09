import angular from 'angular';
import ResetPasswordComponent from './reset-password.component';

// Module dependencies
import ngMessages from 'angular-messages';

const resetPassword = angular
  .module('resetPassword', [
    ngMessages,
  ])
  .component('resetPassword', ResetPasswordComponent)
  .name;

export default resetPassword;
