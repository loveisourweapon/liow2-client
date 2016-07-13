import angular from 'angular';
import ControlPanelSearchComponent from './control-panel-search.component';

const controlPanelSearch = angular
  .module('controlPanelSearch', [])
  .component('controlPanelSearch', ControlPanelSearchComponent)
  .name;

export default controlPanelSearch;
