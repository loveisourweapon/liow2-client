import angular from 'angular';

// Module dependencies
import angularMarked from 'angular-marked';
import User from '../../services/User';
import Deed from '../../services/Deed';
import Modal from '../../services/Modal';
import videotron from '../videotron';

// Component dependencies
import DeedCtrl from './DeedCtrl';
import template from './deed.html';
export let deedTpl = template;

export let deed = angular.module('app.components.deed', [angularMarked, User, Deed, Modal, videotron])
  .controller('DeedCtrl', DeedCtrl)
  .name;
