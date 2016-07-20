import defaults from 'lodash/defaults';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { ForgotPasswordComponent } from './forgot-password';
import { ChangePasswordComponent } from './change-password';
import { GroupEditComponent } from './group-edit';
import { CampaignEditComponent } from './campaign-edit';
import { DeedPreviewComponent } from './deed-preview';
import { AlertComponent } from './alert';
import { ConfirmComponent } from './confirm';

class ModalService {
  /* @ngInject */
  constructor($uibModal, User) {
    Object.assign(this, { $uibModal, User });

    this.modalDefaults = {
      controllerAs: '$ctrl',
      size: 'md',
    };
  }

  /**
   * Open the login modal
   *
   * @param {boolean} [canSwitch=true]
   *
   * @returns {Promise}
   */
  openLogin(canSwitch = true) {
    return this.$uibModal.open(defaults({
      controller: LoginComponent.controller,
      template: LoginComponent.template,
      size: 'sm',
      resolve: {
        canSwitch: () => canSwitch,
      }
    }, this.modalDefaults)).result;
  }

  /**
   * Open the sign up modal
   *
   * @param {boolean} [canSwitch=true]
   *
   * @returns {Promise}
   */
  openSignup(canSwitch = true) {
    return this.$uibModal.open(defaults({
      controller: SignupComponent.controller,
      template: SignupComponent.template,
      resolve: {
        canSwitch: () => canSwitch,
      }
    }, this.modalDefaults)).result;
  }

  /**
   * Open the forgot password modal
   *
   * @param {string|null} [email=null]
   *
   * @returns {Promise}
   */
  openForgotPassword(email = null) {
    return this.$uibModal.open(defaults({
      controller: ForgotPasswordComponent.controller,
      template: ForgotPasswordComponent.template,
      size: 'sm',
      resolve: {
        email: () => email,
      }
    }, this.modalDefaults)).result;
  }

  /**
   * Open the change password modal
   *
   * @param {object} user
   *
   * @returns {Promise}
   */
  openChangePassword(user) {
    return this.$uibModal.open(defaults({
      controller: ChangePasswordComponent.controller,
      template: ChangePasswordComponent.template,
      size: 'sm',
      resolve: {
        user: () => user,
      }
    }, this.modalDefaults)).result;
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
    return this.$uibModal.open(defaults({
      controller: GroupEditComponent.controller,
      template: GroupEditComponent.template,
      resolve: {
        action: () => action,
        group: () => angular.copy(group),
        users: () => group ? this.User.find({ groups: group._id }) : null
      }
    }, this.modalDefaults)).result;
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
    return this.$uibModal.open(defaults({
      controller: CampaignEditComponent.controller,
      template: CampaignEditComponent.template,
      resolve: {
        action: () => action,
        group: () => angular.copy(group),
        campaign: () => angular.copy(campaign),
      }
    }, this.modalDefaults)).result;
  }

  /**
   * Open the deed preview modal
   *
   * @param {string} deedId
   *
   * @returns {Promise}
   */
  openDeedPreview(deedId) {
    return this.$uibModal.open(defaults({
      controller: DeedPreviewComponent.controller,
      template: DeedPreviewComponent.template,
      resolve: {
        deedId: () => deedId,
      }
    }, this.modalDefaults)).result;
  }

  /**
   * Open an alert modal
   *
   * @param {string} message
   * @param {string} [title='']
   * @param {string} [size='sm']
   *
   * @returns {Promise}
   */
  openAlert(message, title = '', size = 'sm') {
    return this.$uibModal.open(defaults({
      controller: AlertComponent.controller,
      template: AlertComponent.template,
      size: size,
      resolve: {
        message: () => message,
        title: () => title,
      }
    }, this.modalDefaults)).result;
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
    return this.$uibModal.open(defaults({
      controller: ConfirmComponent.controller,
      template: ConfirmComponent.template,
      size: 'sm',
      resolve: {
        message: () => message,
        title: () => title,
      }
    }, this.modalDefaults)).result;
  }
}

export default ModalService;
