import angular from 'angular';

class CommentFormController {
  /* @ngInject */
  constructor(Alertify, User, Comment, Feed) {
    Object.assign(this, { Alertify, User, Comment, Feed });
  }

  /**
   * Component bindings updated
   *
   * @param {object} changes
   */
  $onChanges(changes) {
    if (changes.deed) { this.deed = angular.copy(this.deed); }
    if (changes.group) { this.group = angular.copy(this.group); }
    if (changes.comment) { this.comment = angular.copy(this.comment); }
    if (changes.act) { this.act = angular.copy(this.act); }
  }

  /**
   * MediumEditor content changed
   *
   * @param {string} content
   */
  onContentChanged({ content }) {
    if (content) {
      this.textContent = content;
    }
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
   * @param {string} textContent
   */
  save(textContent) {
    let comment = { content: { text: textContent } };
    comment = this.setGroupAndTarget(comment);

    this.saving = true;
    this.Comment.save(comment)
      .then(() => {
        this.Alertify.success('Comment saved');
        this.Feed.update();
        this.textContent = '';
      })
      .catch(() => this.Alertify.success('Failed saving comment'))
      .then(() => this.saving = false);
  }
}

export default CommentFormController;
