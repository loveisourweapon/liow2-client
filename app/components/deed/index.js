import angular from 'angular';

// Module dependencies
import angularMarked from 'angular-marked';
import uibs from 'angular-ui-bootstrap';
import User from '../../services/User';
import Group from '../../services/Group';
import Deed from '../../services/Deed';
import Act from '../../services/Act';
import Feed from '../../services/Feed';
import Modal from '../../services/Modal';
import videotron from '../videotron';
import feed from '../feed';

// Component dependencies
import DeedCtrl from './DeedCtrl';
import template from './deed.html';
export let deedTpl = template;

export let deed = angular.module('app.components.deed', [
  angularMarked,
  uibs,
  User,
  Group,
  Deed,
  Act,
  Modal,
  videotron,
  feed
])
  .controller('DeedCtrl', DeedCtrl)
  .name;
