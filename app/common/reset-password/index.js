import angular from 'angular';
import ResetPasswordComponent from './reset-password.component';

const resetPassword = angular
  .module('resetPassword', [])
  .component('resetPassword', ResetPasswordComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('resetPassword', {
      url: '/reset/:token',
      component: 'resetPassword',
      resolve: {
        token: /* @ngInject */ $stateParams => $stateParams.token,
      }
    });
  })
  .name;

export default resetPassword;
