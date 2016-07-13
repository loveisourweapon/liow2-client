import angular from 'angular';
import UserService from './user.service';
import UserComponent from './user.component';

const user = angular
  .module('user', [])
  .service('User', UserService)
  .component('user', UserComponent)
  .config(($stateProvider, $authProvider, config) => {
    'ngInject';

    $stateProvider.state('user', {
      url: '/u/:userId',
      component: 'user',
      resolve: {
        user: /* @ngInject */ ($stateParams, User) => User.findById($stateParams.userId),
      }
    });

    $authProvider.loginUrl = `${config.serverUrl}/auth/login`;
    $authProvider.signupUrl = `${config.serverUrl}/auth/signup`;
    $authProvider.facebook({
      clientId: config.facebookClientId,
      url: `${config.serverUrl}/auth/facebook`,
    });
  })
  .name;

export default user;
