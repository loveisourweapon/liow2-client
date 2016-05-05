import _ from 'lodash';
import toMarkdown from 'to-markdown';
import showdown from 'showdown';
let converter = new showdown.Converter();

export default class GroupEditCtrl {
  constructor($uibModalInstance, $scope, $timeout, $location, Alertify, User, Group, Modal, action, group, users) {
    Object.assign(this, { $uibModalInstance, $scope, $timeout, $location, Alertify, User, Group, Modal, action, group, users });

    this.error = null;
    this.setupCampaign = this.group ? false : true;

    if (this.group) {
      this.group.welcomeMessage = converter.makeHtml(this.group.welcomeMessage);
    } else if (this.User.current) {
      this.resetFields();
    }

    if (this.User.current) {
      this.setupMediumEditor();
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
   * Initialise the MediumEditor element, respond to input changes
   *
   * TODO: move MediumEditor setup and config to a component
   */
  setupMediumEditor() {
    this.$timeout(() => {
      this.editor = new MediumEditor(document.querySelectorAll('#welcomeMessage'), {
        placeholder: { text: 'Enter a welcome message...', hideOnClick: false },
        toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist'] },
        autoLink: true
      });

      this.editor.subscribe('editableInput', (event, editable) => {
        this.$scope.$apply(() => {
          this.group.welcomeMessage = toMarkdown(editable.innerHTML, {
            converters: [{
              // Remove spans and divs
              filter: function (node) {
                return node.nodeName === 'SPAN' || node.nodeName === 'DIV';
              },
              replacement: function (content) {
                return content;
              }
            }]
          });
        });
      });

      this.$scope.$on('$destroy', () => this.editor.destroy());
    });
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
        this.Group.current = response.data;
        this.User.loadCurrent();

        this.$location.path(`/g/${response.data.urlName}`);
        this.$uibModalInstance.close();
        this.Alertify.success(`${_.capitalize(this.action)}d group <strong>${this.Group.current.name}</strong>`);

        if (this.setupCampaign) {
          this.$location.search('setupCampaign', true);
        }
      })
      .catch(response => this.error = response.data.error)
      .then(() => this.saving = false);
  }
}

GroupEditCtrl.$inject = ['$uibModalInstance', '$scope', '$timeout', '$location', 'Alertify', 'User', 'Group', 'Modal', 'action', 'group', 'users'];
