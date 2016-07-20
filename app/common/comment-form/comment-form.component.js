import CommentFormController from './comment-form.controller';
import commentFormTemplate from './comment-form.html';

const CommentFormComponent = {
  bindings: {
    deed: '<',
    group: '<',
    comment: '<',
    act: '<',
    placeholder: '@',
  },
  controller: CommentFormController,
  template: commentFormTemplate,
};

export default CommentFormComponent;
