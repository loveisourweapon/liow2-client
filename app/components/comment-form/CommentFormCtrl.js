import _ from 'lodash';
import toMarkdown from 'to-markdown';

export default class CommentFormCtrl {
  constructor($scope, $timeout, Alertify, User, Comment) {
    Object.assign(this, { $scope, $timeout, Alertify, User, Comment });

    this.newComment = {
      content: { text: '' }
    };

    this.setupMediumEditor();
  }

  /**
   * Check for and set the comment target and User's current group
   *
   * @param {object} comment
   *
   * @returns {object}
   */
  setGroupAndTarget(comment) {
    comment.group = this.User.group ? this.User.group._id : null;
    if (this.deed) {
      comment.target = { deed: this.deed._id };
    } else if (this.group) {
      comment.target = { group: this.group._id };
    } else if (this.comment) {
      comment.target = { comment: this.comment._id };
    } else if (this.act) {
      comment.target = { act: this.act._id };
    }

    return comment;
  }

  /**
   * Save the comment
   *
   * @param {object} comment
   */
  save(comment) {
    comment = this.setGroupAndTarget(comment);

    this.saving = true;
    this.Comment.save(comment)
      .then(() => this.Alertify.success('Comment saved'))
      .catch(() => null)
      .then(() => {
        this.saving = false;
        this.$timeout(() => this.editor.setContent(''));
        this.onSave();
      });
  }

  /**
   * Initialise the MediumEditor element, respond to input changes
   *
   * TODO: move MediumEditor setup and config to a component
   */
  setupMediumEditor() {
    this.$timeout(() => {
      this.editor = new MediumEditor(document.querySelector('#comment'), {
        placeholder: { text: this.placeholder || 'Enter your message...', hideOnClick: false },
        toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist'] },
        autoLink: true
      });

      if (_.first(this.editor.elements).hasAttribute('autofocus')) {
        _.first(this.editor.elements).focus();
      }

      this.editor.subscribe('editableInput', (event, editable) => {
        this.$scope.$apply(() => {
          this.newComment.content.text = toMarkdown(editable.innerHTML, {
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

CommentFormCtrl.$inject = ['$scope', '$timeout', 'Alertify', 'User', 'Comment'];
