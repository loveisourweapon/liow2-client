import angular from 'angular';
import JumbotronComponent from './jumbotron.component';

let jumbotron = angular
  .module('jumbotron', [])
  .component('jumbotron', JumbotronComponent)
  .name;

export default jumbotron;
