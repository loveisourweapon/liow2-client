import angular from 'angular';
import CommentService from './comment.service';
import CommentFormComponent from './comment-form.component';

const comment = angular
  .module('comment', [])
  .service('Comment', CommentService)
  .component('commentForm', CommentFormComponent)
  .name;

export default comment;
