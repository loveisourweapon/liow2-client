import _ from 'lodash';
import angular from 'angular';

// Module dependencies
import ngRoute from 'angular-route';
import ngSanitize from 'angular-sanitize';
import angularDragula from 'angular-dragula';
import uibs from 'angular-ui-bootstrap';
import uiSelect from 'ui-select';
import angularMarked from 'angular-marked';
import angularYoutube from 'angular-youtube-embed';
import 'angular-ui-switch'; // Not browserified
import lodashFilters from '../../filters/lodash';
import directives from '../../directives';
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import Group from '../../services/Group';
import Campaign from '../../services/Campaign';
import Deed from '../../services/Deed';

// Modal controllers & templates
import LoginCtrl from './login/LoginCtrl';
import loginTpl from './login/login.html';
import SignupCtrl from './signup/SignupCtrl';
import signupTpl from './signup/signup.html';
import ForgotPasswordCtrl from './forgot-password/ForgotPasswordCtrl';
import forgotPasswordTpl from './forgot-password/forgotPassword.html';
import GroupEditCtrl from './group-edit/GroupEditCtrl';
import groupEditTpl from './group-edit/groupEdit.html';
import CampaignEditCtrl from './campaign-edit/CampaignEditCtrl';
import campaignEditTpl from './campaign-edit/campaignEdit.html';
import DeedPreviewCtrl from './deed-preview/DeedPreviewCtrl';
import deedPreviewTpl from './deed-preview/deedPreview.html';
import AlertCtrl from './alert/AlertCtrl';
import alertTpl from './alert/alert.html';
import ConfirmCtrl from './confirm/ConfirmCtrl';
import confirmTpl from './confirm/confirm.html';

class Modal {
  constructor($uibModal, $q, User) {
    Object.assign(this, { $uibModal, $q, User });

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
   * Open the sign up modal
   *
   * @returns {Promise}
   */
  openSignup() {
    return this.$uibModal.open(_.defaults({
      controller: SignupCtrl,
      template: signupTpl
    }, this.defaults)).result;
  }

  /**
   * Open the forgot password modal
   *
   * @param {string|null} [email=null]
   *
   * @returns {Promise}
   */
  openForgotPassword(email = null) {
    return this.$uibModal.open(_.defaults({
      controller: ForgotPasswordCtrl,
      template: forgotPasswordTpl,
      size: 'sm',
      resolve: {
        email: this.$q.resolve(email)
      }
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
        group: this.$q.resolve(angular.copy(group)),
        users: group ? this.User.find({ groups: group._id }).then(response => response.data) : null
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

Modal.$inject = ['$uibModal', '$q', 'User'];

export default angular.module('app.services.Modal', [
  ngRoute,
  ngSanitize,
  angularDragula(angular),
  uibs,
  uiSelect,
  angularMarked,
  angularYoutube,
  'uiSwitch',
  lodashFilters,
  directives,
  Alertify,
  User,
  Group,
  Campaign,
  Deed
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
