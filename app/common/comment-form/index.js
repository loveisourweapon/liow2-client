import angular from 'angular';
import CommentFormService from './comment-form.service';
import CommentFormComponent from './comment-form.component';

const commentForm = angular
  .module('commentForm', [])
  .service('CommentForm', CommentFormService)
  .component('commentForm', CommentFormComponent)
  .name;

export default commentForm;
