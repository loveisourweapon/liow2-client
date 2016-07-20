import angular from 'angular';
import IconCheckedComponent from './icon-checked.component';

const iconChecked = angular
  .module('iconChecked', [])
  .component('iconChecked', IconCheckedComponent)
  .name;

export default iconChecked;
