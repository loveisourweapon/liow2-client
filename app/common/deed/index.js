import angular from 'angular';
import DeedService from './deed.service';
import DeedComponent from './deed.component';

const deed = angular
  .module('deed', [])
  .service('Deed', DeedService)
  .component('deed', DeedComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('deed', {
      url: '/d/:deedSlug',
      component: 'deed',
      resolve: {
        deedSlug: /* @ngInject */ $stateParams => $stateParams.deedSlug,
      }
    });
  })
  .name;

export default deed;
