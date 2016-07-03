import angular from 'angular';
import DeedListComponent from './deed-list.component';

// Module dependencies
import Deed from '../../services/Deed';
import Act from '../../services/Act';

const deedList = angular
  .module('deedList', [
    Deed,
    Act,
  ])
  .component('deedList', DeedListComponent)
  .name;

export default deedList;
