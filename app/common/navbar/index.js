import angular from 'angular';
import NavbarComponent from './navbar.component';

// Module dependencies
import ngAnimate from 'angular-animate';

const navbar = angular
  .module('navbar', [
    ngAnimate,
  ])
  .component('navbar', NavbarComponent)
  .name;

export default navbar;
