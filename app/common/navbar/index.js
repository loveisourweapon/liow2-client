import angular from 'angular';
import NavbarComponent from './navbar.component';

// Module dependencies
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';
import uibs from 'angular-ui-bootstrap';
import uiSelect from 'ui-select';
import User from '../../services/User';
import Group from '../../services/Group';
import Deed from '../../services/Deed';
import Act from '../../services/Act';

const navbar = angular
  .module('navbar', [
    ngSanitize,
    ngAnimate,
    uibs,
    uiSelect,
    User,
    Group,
    Deed,
    Act,
  ])
  .component('navbar', NavbarComponent)
  .name;

export default navbar;
