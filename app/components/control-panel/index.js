import angular from 'angular';

// Module dependencies
import angularMarked from 'angular-marked';
import uibs from 'angular-ui-bootstrap';
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import Group from '../../services/Group';
import Act from '../../services/Act';
import Modal from '../../services/Modal';
import directives from '../../directives';
import lodashFilters from '../../filters/lodash';
import momentFilters from '../../filters/moment';

// Component dependencies
import ControlPanelCtrl from './ControlPanelCtrl';
import controlPanelTpl from './controlPanel.html';
import UserControlPanelCtrl from './UserControlPanelCtrl';
import userControlPanelTpl from './userControlPanel.html';
import GroupControlPanelCtrl from './GroupControlPanelCtrl';
import groupControlPanelTpl from './groupControlPanel.html';
import DeedsControlPanelCtrl from './DeedsControlPanelCtrl';
import deedsControlPanelTpl from './deedsControlPanel.html';
import UsersControlPanelCtrl from './UsersControlPanelCtrl';
import usersControlPanelTpl from './usersControlPanel.html';
import GroupsControlPanelCtrl from './GroupsControlPanelCtrl';
import groupsControlPanel from './groupsControlPanel.html';

export default angular.module('app.components.controlPanel', [
  angularMarked,
  uibs,
  Alertify,
  User,
  Group,
  Act,
  Modal,
  directives,
  lodashFilters,
  momentFilters
])
  .component('controlPanel', {
    controller: ControlPanelCtrl,
    template: controlPanelTpl,
    bindings: {
      view: '<'
    }
  })
  .component('userControlPanel', {
    controller: UserControlPanelCtrl,
    template: userControlPanelTpl
  })
  .component('groupControlPanel', {
    controller: GroupControlPanelCtrl,
    template: groupControlPanelTpl,
    bindings: {
      groupId: '<'
    }
  })
  .component('deedsControlPanel', {
    controller: DeedsControlPanelCtrl,
    template: deedsControlPanelTpl
  })
  .component('usersControlPanel', {
    controller: UsersControlPanelCtrl,
    template: usersControlPanelTpl
  })
  .component('groupsControlPanel', {
    controller: GroupsControlPanelCtrl,
    template: groupsControlPanel
  })
  .name;
