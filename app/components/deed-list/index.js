import angular from 'angular';
import DeedListComponent from './deed-list.component';
import DeedListVerticalComponent from './deed-list-vertical.component';
import DeedListHorizontalComponent from './deed-list-horizontal.component';

// Module dependencies
import Deed from '../../services/Deed';
import Act from '../../services/Act';

const deedList = angular
  .module('deedList', [
    Deed,
    Act,
  ])
  .component('deedList', DeedListComponent)
  .component('deedListVertical', DeedListVerticalComponent)
  .component('deedListHorizontal', DeedListHorizontalComponent)
  .name;

export default deedList;
