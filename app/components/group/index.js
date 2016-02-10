import angular from 'angular';

// Module dependencies
import angularMarked from 'angular-marked';
import User from '../../services/User';
import Group from '../../services/Group';
import Modal from '../../services/Modal';
import jumbotron from '../jumbotron';

// Component dependencies
import GroupCtrl from './GroupCtrl';
import template from './group.html';
export let groupTpl = template;

export let group = angular.module('app.components.group', [angularMarked, User, Group, Modal, jumbotron])
  .controller('GroupCtrl', GroupCtrl)
  .name;
