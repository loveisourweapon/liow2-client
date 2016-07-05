import angular from 'angular';
import ConfirmEmailComponent from './confirm-email.component';

// Module dependencies
import User from '../../services/User';

const confirmEmail = angular
  .module('confirmEmail', [
    User,
  ])
  .component('confirmEmail', ConfirmEmailComponent)
  .name;

export default confirmEmail;
