import _ from 'lodash';
import toMarkdown from 'to-markdown';
import showdown from 'showdown';
let converter = new showdown.Converter();

export default class CommentEditCtrl {
  constructor($uibModalInstance, $scope, $timeout, Alertify, Comment, title, target, comment) {
    Object.assign(this, { $uibModalInstance, $scope, $timeout, Alertify, Comment, title, target, comment });

    if (!this.comment) {
      this.resetFields(this.target);
    }

    this.setupMediumEditor();
  }

  /**
   * Reset all form fields to defaults
   */
  resetFields(target) {
    this.comment = {
      content: { text: '' }
    };

    switch(true) {
      case _.has(target, 'title'):
        this.comment.target = { deed: target._id };
        break;
      case _.has(target, 'email'):
        this.comment.target = { user: target._id };
        break;
      case _.has(target, 'name'):
        this.comment.target = { group: target._id };
        break;
      default:
        this.comment.target = { act: target._id };
    }
  }

  /**
   * Save the comment
   *
   * @param {object} comment
   */
  save(comment) {
    this.saving = true;
    this.Comment.save(comment)
      .then(() => {
        this.$uibModalInstance.close();
        this.Alertify.success('Comment saved');
      })
      .catch(() => null)
      .then(() => this.saving = false);
  }

  /**
   * Initialise the MediumEditor element, respond to input changes
   *
   * TODO: move MediumEditor setup and config to a component
   */
  setupMediumEditor() {
    this.$timeout(() => {
      this.editor = new MediumEditor(document.querySelector('#comment'), {
        placeholder: { text: 'Enter your message...', hideOnClick: false },
        toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist'] },
        autoLink: true
      });

      if (_.first(this.editor.elements).hasAttribute('autofocus')) {
        _.first(this.editor.elements).focus();
      }

      this.editor.subscribe('editableInput', (event, editable) => {
        this.$scope.$apply(() => {
          this.comment.content.text = toMarkdown(editable.innerHTML, {
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
}

CommentEditCtrl.$inject = ['$uibModalInstance', '$scope', '$timeout', 'Alertify', 'Comment', 'title', 'target', 'comment'];
