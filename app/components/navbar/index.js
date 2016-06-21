import angular from 'angular';

// Module dependencies
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';
import uibs from 'angular-ui-bootstrap';
import uiSelect from 'ui-select';
import User from '../../services/User';
import Group from '../../services/Group';
import Deed from '../../services/Deed';
import Act from '../../services/Act';
import Modal from '../../services/Modal';

// Component dependencies
import NavbarCtrl from './NavbarCtrl';
import navbarTpl from './navbar.html';

export default angular.module('app.components.navbar', [
  ngSanitize,
  ngAnimate,
  uibs,
  uiSelect,
  User,
  Group,
  Deed,
  Act,
  Modal
])
  .component('navbar', {
    controller: NavbarCtrl,
    template: navbarTpl
  })
  .name;
