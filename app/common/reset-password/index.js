import angular from 'angular';
import ResetPasswordComponent from './reset-password.component';

// Module dependencies
import Alertify from '../../components/Alertify';
import User from '../../services/User';
import Jumbotron from '../../components/jumbotron';
import SameAs from '../../components/same-as';

const resetPassword = angular
  .module('resetPassword', [
    Alertify,
    User,
    Jumbotron,
    SameAs,
  ])
  .component('resetPassword', ResetPasswordComponent)
  .name;

export default resetPassword;
