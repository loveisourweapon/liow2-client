import angular from 'angular';

// Module dependencies
import jumbotron from '../jumbotron';
import welcome from '../welcome';

import HomeCtrl from './HomeCtrl';
import template from './home.html';
export let homeTpl = template;

export let home = angular.module('app.components.home', [jumbotron, welcome])
  .controller('HomeCtrl', HomeCtrl)
  .name;
