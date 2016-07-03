import angular from 'angular';
import AlertifyService from './alertify.service';

const alertify = angular
  .module('alertify', [])
  .service('Alertify', AlertifyService)
  .name;

export default alertify;
