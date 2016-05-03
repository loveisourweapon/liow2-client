import angular from 'angular';

// Module dependencies
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import Comment from '../../services/Comment';

// Component dependencies
import CommentFormCtrl from './CommentFormCtrl';
import commentFormTpl from './commentForm.html';

export default angular.module('app.components.commentForm', [
  Alertify,
  User,
  Comment
])
  .component('commentForm', {
    controller: CommentFormCtrl,
    template: commentFormTpl,
    bindings: {
      deed: '<',
      group: '<',
      comment: '<',
      act: '<',
      onSave: '&',
      placeholder: '@'
    }
  })
  .name;
