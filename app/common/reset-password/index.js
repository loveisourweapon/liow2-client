import angular from 'angular';
import ResetPasswordComponent from './reset-password.component';

// Module dependencies
import User from '../../services/User';

const resetPassword = angular
  .module('resetPassword', [
    User,
  ])
  .component('resetPassword', ResetPasswordComponent)
  .name;

export default resetPassword;
