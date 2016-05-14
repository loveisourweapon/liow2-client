import toMarkdown from 'to-markdown';

export default class CommentFormCtrl {
  /* @ngInject */
  constructor($element, $scope, $timeout, Alertify, User, Comment, Feed) {
    Object.assign(this, { $element, $scope, $timeout, Alertify, User, Comment, Feed });

    this.newComment = {
      content: { text: '' }
    };
  }

  /**
   * All elements compiled and linked
   */
  $postLink() {
    this.setupMediumEditor();
  }

  /**
   * Scope is being destroyed
   */
  $onDestroy() {
    this.editor.destroy();
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
      .then(() => {
        this.Alertify.success('Comment saved');
        this.Feed.update();
        this.$timeout(() => this.editor.setContent(''));
      })
      .catch(() => this.Alertify.success('Failed saving comment'))
      .then(() => this.saving = false);
  }

  /**
   * Initialise the MediumEditor element, respond to input changes
   *
   * TODO: move MediumEditor setup and config to a component
   */
  setupMediumEditor() {
    this.editor = new MediumEditor(this.$element.find('textarea'), {
      placeholder: { text: this.placeholder || 'Enter your message...', hideOnClick: false },
      toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist'] },
      autoLink: true
    });

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
  }
}
