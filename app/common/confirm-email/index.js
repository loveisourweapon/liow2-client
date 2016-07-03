import angular from 'angular';
import ConfirmEmailComponent from './confirm-email.component';

// Module dependencies
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import Jumbotron from '../../components/jumbotron';

const confirmEmail = angular
  .module('confirmEmail', [
    Alertify,
    User,
    Jumbotron,
  ])
  .component('confirmEmail', ConfirmEmailComponent)
  .name;

export default confirmEmail;
