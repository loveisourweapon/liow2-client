import angular from 'angular';
import CommentFormComponent from './comment-form.component';

// Module dependencies
import Alertify from '../alertify';
import User from '../../services/User';
import Comment from '../../services/Comment';
import Feed from '../../services/Feed';
import MediumEditor from '../medium-editor';

const commentForm = angular
  .module('commentForm', [
    Alertify,
    User,
    Comment,
    Feed,
    MediumEditor,
  ])
  .component('commentForm', CommentFormComponent)
  .name;

export default commentForm;
