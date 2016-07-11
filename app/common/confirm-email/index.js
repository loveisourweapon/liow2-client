import angular from 'angular';
import ConfirmEmailComponent from './confirm-email.component';

const confirmEmail = angular
  .module('confirmEmail', [])
  .component('confirmEmail', ConfirmEmailComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('confirmEmail', {
      url: '/confirm/:token',
      component: 'confirmEmail',
      resolve: {
        token: /* @ngInject */ $stateParams => $stateParams.token,
      }
    });
  })
  .name;

export default confirmEmail;
