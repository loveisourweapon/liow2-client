import angular from 'angular';
import has from 'lodash/has';

// Module dependencies
import config from '../config';

class Comment {
  /* @ngInject */
  constructor($http, config) {
    Object.assign(this, { $http });

    this.baseUrl = config.serverUrl;
  }

  /**
   * Save a comment
   *
   * @param {object} comment
   */
  save(comment) {
    let method = has(comment, '_id') ? 'put' : 'post',
        url = `/comments${has(comment, '_id') ? `/${comment._id}` : ''}`;

    switch(true) {
      case has(comment.target, 'deed'):
        url = `/deeds/${comment.target.deed}${url}`;
        break;
      case has(comment.target, 'group'):
        url = `/groups/${comment.target.group}${url}`;
        break;
      case has(comment.target, 'comment'):
        url = `/comments/${comment.target.comment}${url}`;
        break;
      case has(comment.target, 'act'):
        url = `/acts/${comment.target.acts}${url}`;
        break;
    }

    return this.$http[method](`${this.baseUrl}${url}`, comment);
  }
}

export default angular.module('si.services.Comment', [
  config
])
  .service('Comment', Comment)
  .name;
