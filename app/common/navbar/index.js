import angular from 'angular';
import NavbarComponent from './navbar.component';

// Module dependencies
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';
import uibs from 'angular-ui-bootstrap';
import uiSelect from 'ui-select';

const navbar = angular
  .module('navbar', [
    ngSanitize,
    ngAnimate,
    uibs,
    uiSelect,
  ])
  .component('navbar', NavbarComponent)
  .name;

export default navbar;
