import angular from 'angular';

// Module dependencies
import Alertify from '../../services/Alertify';
import User from '../../services/User';
import Comment from '../../services/Comment';
import Feed from '../../services/Feed';

// Component dependencies
import CommentFormCtrl from './CommentFormCtrl';
import commentFormTpl from './commentForm.html';

export default angular.module('app.components.commentForm', [
  Alertify,
  User,
  Comment,
  Feed
])
  .component('commentForm', {
    controller: CommentFormCtrl,
    template: commentFormTpl,
    bindings: {
      deed: '<',
      group: '<',
      comment: '<',
      act: '<',
      placeholder: '@'
    }
  })
  .name;
