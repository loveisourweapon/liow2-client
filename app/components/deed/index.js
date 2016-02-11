import angular from 'angular';

// Module dependencies
import angularMarked from 'angular-marked';
import User from '../../services/User';
import Group from '../../services/Group';
import Deed from '../../services/Deed';
import Act from '../../services/Act';
import Modal from '../../services/Modal';
import videotron from '../videotron';

// Component dependencies
import DeedCtrl from './DeedCtrl';
import template from './deed.html';
export let deedTpl = template;

export let deed = angular.module('app.components.deed', [angularMarked, User, Group, Deed, Act, Modal, videotron])
  .controller('DeedCtrl', DeedCtrl)
  .name;
