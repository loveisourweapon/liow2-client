import _ from 'lodash';
import angular from 'angular';

// Module dependencies
import ngRoute from 'angular-route';
import angularDragula from 'angular-dragula';
import uibs from 'angular-ui-bootstrap';
import angularMarked from 'angular-marked';
import angularYoutube from 'angular-youtube-embed';
import 'angular-ui-switch'; // Not browserified
import lodashFilters from '../../filters/lodash';
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import Group from '../../services/Group';
import Campaign from '../../services/Campaign';
import Deed from '../../services/Deed';
import Comment from '../../services/Comment';

// Modal controllers & templates
import LoginCtrl from './login/LoginCtrl';
import loginTpl from './login/login.html';
import GroupEditCtrl from './group-edit/GroupEditCtrl';
import groupEditTpl from './group-edit/group-edit.html';
import CampaignEditCtrl from './campaign-edit/CampaignEditCtrl';
import campaignEditTpl from './campaign-edit/campaign-edit.html';
import DeedPreviewCtrl from './deed-preview/DeedPreviewCtrl';
import deedPreviewTpl from './deed-preview/deed-preview.html';
import CommentEditCtrl from './comment/CommentEditCtrl';
import commentEditTpl from './comment/comment-edit.html';
import AlertCtrl from './alert/AlertCtrl';
import alertTpl from './alert/alert.html';
import ConfirmCtrl from './confirm/ConfirmCtrl';
import confirmTpl from './confirm/confirm.html';

class Modal {
  constructor($uibModal, $q) {
    Object.assign(this, { $uibModal, $q });

    this.defaults = {
      controllerAs: '$ctrl',
      size: 'md'
    };
  }

  /**
   * Open the login modal
   *
   * @returns {Promise}
   */
  openLogin() {
    return this.$uibModal.open(_.defaults({
      controller: LoginCtrl,
      template: loginTpl,
      size: 'sm'
    }, this.defaults)).result;
  }

  /**
   * Open the group edit modal
   *
   * @param {string} [action='create']
   * @param {object} [group=null]
   *
   * @returns {Promise}
   */
  openGroupEdit(action = 'create', group = null) {
    return this.$uibModal.open(_.defaults({
      controller: GroupEditCtrl,
      template: groupEditTpl,
      resolve: {
        action: this.$q.resolve(action),
        group: this.$q.resolve(angular.copy(group))
      }
    }, this.defaults)).result;
  }

  /**
   * Open the campaign edit modal
   *
   * @param {string} [action='create']
   * @param {object} group
   * @param {object} [campaign=null]
   *
   * @returns {Promise}
   */
  openCampaignEdit(action = 'create', group, campaign = null) {
    return this.$uibModal.open(_.defaults({
      controller: CampaignEditCtrl,
      template: campaignEditTpl,
      resolve: {
        action: this.$q.resolve(action),
        group: this.$q.resolve(angular.copy(group)),
        campaign: this.$q.resolve(angular.copy(campaign))
      }
    }, this.defaults)).result;
  }

  /**
   * Open the deed preview modal
   *
   * @param {string} deedId
   *
   * @returns {Promise}
   */
  openDeedPreview(deedId) {
    return this.$uibModal.open(_.defaults({
      controller: DeedPreviewCtrl,
      template: deedPreviewTpl,
      resolve: {
        deedId: this.$q.resolve(deedId)
      }
    }, this.defaults)).result;
  }

  /**
   * Open the comment edit modal
   *
   * @param {string} [title='New Comment']
   * @param {object} target
   * @param {object} [group=null]
   * @param {object} [comment=null]
   *
   * @returns {Promise}
   */
  openCommentEdit(title = 'New Comment', target, group = null, comment = null) {
    return this.$uibModal.open(_.defaults({
      controller: CommentEditCtrl,
      template: commentEditTpl,
      resolve: {
        title: this.$q.resolve(title),
        target: this.$q.resolve(target),
        group: this.$q.resolve(group),
        comment: this.$q.resolve(comment)
      }
    }, this.defaults)).result;
  }

  /**
   * Open an alert modal
   *
   * @param {string} message
   * @param {string} [title='']
   *
   * @returns {Promise}
   */
  openAlert(message, title = '') {
    return this.$uibModal.open(_.defaults({
      controller: AlertCtrl,
      template: alertTpl,
      size: 'sm',
      resolve: {
        message: this.$q.resolve(message),
        title: this.$q.resolve(title)
      }
    }, this.defaults)).result;
  }

  /**
   * Open a confirm modal
   *
   * @param {string} message
   * @param {string} [title='']
   *
   * @returns {Promise}
   */
  openConfirm(message, title = '') {
    return this.$uibModal.open(_.defaults({
      controller: ConfirmCtrl,
      template: confirmTpl,
      size: 'sm',
      resolve: {
        message: this.$q.resolve(message),
        title: this.$q.resolve(title)
      }
    }, this.defaults)).result;
  }
}

Modal.$inject = ['$uibModal', '$q'];

export default angular.module('app.services.Modal', [
  ngRoute,
  angularDragula(angular),
  uibs,
  angularMarked,
  angularYoutube,
  'uiSwitch',
  lodashFilters,
  User,
  Group,
  Campaign,
  Deed,
  Comment
])
  .service('Modal', Modal)
  .name;

// Fixes to UI Bootstrap Modal
angular.module(uibs)
  .directive('uibModalWindow', ['$window', $window => {
    return {
      priority: 1,
      link: (scope, element) => {
        // Set max-height on modal-body
        let window = angular.element($window);
        window.on('resize', setMaxHeight);
        scope.$on('$destroy', () => window.off('resize', setMaxHeight));
        setMaxHeight();

        function setMaxHeight() {
          element
            .find('.modal-body')
            .css({
              maxHeight: window.height() * 0.85 - 80,
              overflowY: 'auto'
            });
        }
      }
    }
  }]);
