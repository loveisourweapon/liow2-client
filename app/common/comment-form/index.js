import angular from 'angular';
import CommentFormComponent from './comment-form.component';

// Module dependencies
import User from '../../services/User';
import Comment from '../../services/Comment';

const commentForm = angular
  .module('commentForm', [
    User,
    Comment,
  ])
  .component('commentForm', CommentFormComponent)
  .name;

export default commentForm;
