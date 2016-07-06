import angular from 'angular';
import LoadingSpinnerComponent from './loading-spinner.component';

const loadingSpinner = angular
  .module('loadingSpinner', [])
  .component('loadingSpinner', LoadingSpinnerComponent)
  .name;

export default loadingSpinner;
