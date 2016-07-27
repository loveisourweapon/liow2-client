import has from 'lodash/has';

class CommentService {
  /* @ngInject */
  constructor($http, config) {
    Object.assign(this, { $http });

    this.baseUrl = config.serverUrl;
  }

  /**
   * Find comments by params
   *
   * @param {object} [params={}]
   *
   * @returns {Promise}
   */
  find(params = {}) {
    return this.$http.get(`${this.baseUrl}/comments`, { params }).then(extractData);
  }


  /**
   * Save a comment
   *
   * @param {object} comment
   *
   * @returns {Promise}
   */
  save(comment) {
    let method = has(comment, '_id') ? 'put' : 'post',
        url = `/comments${has(comment, '_id') ? `/${comment._id}` : ''}`;

    if (has(comment.target, 'deed')) {
      url = `/deeds/${comment.target.deed}${url}`;
    } else if (has(comment.target, 'group')) {
      url = `/groups/${comment.target.group}${url}`;
    } else if (has(comment.target, 'comment')) {
      url = `/comments/${comment.target.comment}${url}`;
    } else if (has(comment.target, 'act')) {
      url = `/acts/${comment.target.acts}${url}`;
    }

    return this.$http[method](`${this.baseUrl}${url}`, comment).then(extractData);
  }
}

/**
 * Extra data from HTTP response
 *
 * @param {Response} response
 *
 * @returns {*}
 */
function extractData(response) {
  return response.data;
}

export default CommentService;
