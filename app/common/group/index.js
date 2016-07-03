import angular from 'angular';
import GroupComponent from './group.component';

// Module dependencies
import angularMarked from 'angular-marked';
import uibs from 'angular-ui-bootstrap';
import Alertify from '../../components/Alertify';
import User from '../../services/User';
import Group from '../../services/Group';
import Campaign from '../../services/Campaign';
import Act from '../../services/Act';
import Feed from '../../services/Feed';
import Modal from '../modal';
import Jumbotron from '../../components/jumbotron';
import feed from '../../components/feed';

const group = angular
  .module('group', [
    angularMarked,
    uibs,
    Alertify,
    User,
    Group,
    Campaign,
    Act,
    Feed,
    Modal,
    Jumbotron,
    feed,
  ])
  .component('group', GroupComponent)
  .name;

export default group;
