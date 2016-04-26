import angular from 'angular';

// Module dependencies
import angularMarked from 'angular-marked';
import angularYoutube from 'angular-youtube-embed';
import uibs from 'angular-ui-bootstrap';
import User from '../../services/User';
import Group from '../../services/Group';
import Deed from '../../services/Deed';
import Act from '../../services/Act';
import Feed from '../../services/Feed';
import Modal from '../../services/Modal';
import jumbotron from '../jumbotron';
import feed from '../feed';
import deedList from '../deed-list';

// Component dependencies
import DeedCtrl from './DeedCtrl';
import template from './deed.html';
export let deedTpl = template;

export let deed = angular.module('app.components.deed', [
  angularMarked,
  angularYoutube,
  uibs,
  User,
  Group,
  Deed,
  Act,
  Feed,
  Modal,
  jumbotron,
  feed,
  deedList
])
  .controller('DeedCtrl', DeedCtrl)
  .name;
