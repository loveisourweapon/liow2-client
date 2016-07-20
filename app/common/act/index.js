import angular from 'angular';
import ActService from './act.service';

const act = angular
  .module('act', [])
  .service('Act', ActService)
  .name;

export default act;
