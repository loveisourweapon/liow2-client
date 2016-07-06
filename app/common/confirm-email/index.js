import angular from 'angular';
import ConfirmEmailComponent from './confirm-email.component';

const confirmEmail = angular
  .module('confirmEmail', [])
  .component('confirmEmail', ConfirmEmailComponent)
  .name;

export default confirmEmail;
