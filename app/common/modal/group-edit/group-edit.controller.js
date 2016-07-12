import capitalize from 'lodash/capitalize';

class GroupEditController {
  /* @ngInject */
  constructor($uibModalInstance, $state, Alertify, User, Group, Modal, action, group, users) {
    Object.assign(this, { $uibModalInstance, $state, Alertify, User, Group, Modal, action, group, users });

    this.error = null;
    this.setupCampaign = this.group ? false : true;

    if (!group && this.User.current) {
      this.resetFields();
    }
  }

  /**
   * Reset all form fields to defaults
   */
  resetFields() {
    this.users = [this.User.current];

    this.group = {
      name: '',
      logo: undefined,
      coverImage: undefined,
      admins: [this.User.current._id],
      welcomeMessage: ''
    };
  }

  /**
   * Welcome message content changed
   *
   * @param {string} content
   */
  onWelcomeContentChanged({ content }) {
    if (content) {
      this.group.welcomeMessage = content;
    }
  }

  /**
   * Prompt user to login, then reset the form fields and setup the MediumEditor
   *
   * @param {string} type
   */
  openModal(type) {
    this.Modal[type === 'login' ? 'openLogin' : 'openSignup'](false)
      .then(() => this.User.loadCurrent())
      .then(() => this.resetFields())
      .then(() => this.setupMediumEditor())
      .catch(() => null);
  }

  /**
   * Save the Group
   *
   * @param {object} group
   */
  save(group) {
    this.saving = true;
    this.error = null;
    this.Group.save(group)
      .then(response => {
        if (
          this.action === 'create' ||
          (this.Group.current && this.Group.current._id === group._id)
        ) {
          this.Group.current = response.data;
          this.User.loadCurrent();
        }

        this.$uibModalInstance.close(group);
        this.Alertify.success(`${capitalize(this.action)}d group <strong>${group.name}</strong>`);

        if (this.action === 'create') {
          this.$state.go('group', {
            groupSlug: response.data.urlName,
            setupCampaign: this.setupCampaign ? true : undefined,
          });
        }
      })
      .catch(response => this.error = response.data.error)
      .then(() => this.saving = false);
  }
}

export default GroupEditController;
