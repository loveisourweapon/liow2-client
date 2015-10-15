import angular from 'angular';

// Module dependencies
import jumbotron from '../jumbotron';
import welcome from '../welcome';

import template from './home.html';
export let homeTpl = template;

function HomeCtrl() {
  this.name = 'Ben';
}

export let home = angular.module('app.components.home', [jumbotron, welcome])
  .controller('HomeCtrl', HomeCtrl)
  .name;
