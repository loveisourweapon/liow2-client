import angular from 'angular';
import GroupComponent from './group.component';

// Module dependencies
import angularMarked from 'angular-marked';
import uibs from 'angular-ui-bootstrap';
import User from '../../services/User';
import Group from '../../services/Group';
import Campaign from '../../services/Campaign';
import Act from '../../services/Act';
import Feed from '../../services/Feed';

const group = angular
  .module('group', [
    angularMarked,
    uibs,
    User,
    Group,
    Campaign,
    Act,
    Feed,
  ])
  .component('group', GroupComponent)
  .name;

export default group;
