import angular from 'angular';
import DeedService from './deed.service';
import DeedComponent from './deed.component';

const deed = angular
  .module('deed', [])
  .service('Deed', DeedService)
  .component('deed', DeedComponent)
  .name;

export default deed;
