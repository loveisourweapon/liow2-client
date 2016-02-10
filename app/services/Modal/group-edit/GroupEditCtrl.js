import _ from 'lodash';
import toMarkdown from 'to-markdown';

export default class GroupEditCtrl {
  constructor($uibModalInstance, $scope, $timeout, $location, User, Group, Modal, action) {
    Object.assign(this, { $uibModalInstance, $scope, $timeout, $location, User, Group, Modal, action });

    this.loading = false;
    this.error = null;
    this.resetFields();

    if (_.isObject(this.User.current)) {
      this.setupMediumEditor();
    }
  }

  /**
   * Reset all form fields to defaults
   */
  resetFields() {
    this.group = {
      name: '',
      logo: '',
      coverImage: '',
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
        placeholder: { text: 'Enter a welcome message...' },
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
   */
  openLoginModal() {
    this.Modal
      .openLogin()
      .then(() => this.User.loadCurrent())
      .then(() => this.setupMediumEditor())
      .catch((err) => null);
  }

  /**
   * Save the Group
   *
   * @param {object} group
   */
  save(group) {
    this.saving = true;
    this.error = null;
    this.Group
      .create(group)
      .then(response => {
        this.Group.current = response.data;
        this.$location.path(`/g/${response.data.urlName}`);
        this.$uibModalInstance.close();
      })
      .catch(response => this.error = response.data.error)
      .then(() => this.saving = false);
  }
}

GroupEditCtrl.$inject = ['$uibModalInstance', '$scope', '$timeout', '$location', 'User', 'Group', 'Modal', 'action'];
