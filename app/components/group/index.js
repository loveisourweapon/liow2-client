import angular from 'angular';

// Module dependencies
import angularMarked from 'angular-marked';
import uibs from 'angular-ui-bootstrap';
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import Group from '../../services/Group';
import Campaign from '../../services/Campaign';
import Act from '../../services/Act';
import Feed from '../../services/Feed';
import Modal from '../../services/Modal';
import jumbotron from '../jumbotron';
import feed from '../feed';

// Component dependencies
import GroupCtrl from './GroupCtrl';
import template from './group.html';
export let groupTpl = template;

export let group = angular.module('app.components.group', [
  angularMarked,
  uibs,
  Alertify,
  User,
  Group,
  Campaign,
  Act,
  Feed,
  Modal,
  jumbotron,
  feed
])
  .controller('GroupCtrl', GroupCtrl)
  .name;
