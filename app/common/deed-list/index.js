import angular from 'angular';
import DeedListComponent from './deed-list.component';
import DeedListVerticalComponent from './deed-list-vertical.component';
import DeedListHorizontalComponent from './deed-list-horizontal.component';

const deedList = angular
  .module('deedList', [])
  .component('deedList', DeedListComponent)
  .component('deedListVertical', DeedListVerticalComponent)
  .component('deedListHorizontal', DeedListHorizontalComponent)
  .name;

export default deedList;
