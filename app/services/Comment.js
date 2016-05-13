import _ from 'lodash';
import angular from 'angular';

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
    let method = _.has(comment, '_id') ? 'put' : 'post',
        url = `/comments${_.has(comment, '_id') ? `/${comment._id}` : ''}`;

    switch(true) {
      case _.has(comment.target, 'deed'):
        url = `/deeds/${comment.target.deed}${url}`;
        break;
      case _.has(comment.target, 'group'):
        url = `/groups/${comment.target.group}${url}`;
        break;
      case _.has(comment.target, 'comment'):
        url = `/comments/${comment.target.comment}${url}`;
        break;
      case _.has(comment.target, 'act'):
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
