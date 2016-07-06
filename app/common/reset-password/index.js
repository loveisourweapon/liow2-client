import angular from 'angular';
import ResetPasswordComponent from './reset-password.component';

const resetPassword = angular
  .module('resetPassword', [])
  .component('resetPassword', ResetPasswordComponent)
  .name;

export default resetPassword;
