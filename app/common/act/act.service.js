import angular from 'angular';
import has from 'lodash/has';
import defaults from 'lodash/defaults';

class ActService {
  /* @ngInject */
  constructor($http, config) {
    Object.assign(this, { $http });

    this.baseUrl = `${config.serverUrl}/acts`;
    this.counters = {};
  }

  /**
   * Count acts for global, a user, a group, a campaign or a deed
   *
   * @param {object} [params={}]
   *
   * @returns {Promise}
   */
  count(params = {}) {
    params = defaults(params, { count: true });

    return this.$http.get(this.baseUrl, { params })
      .then(extractData)
      .then(count => Number(count))
      .then(count => {
        if (params.user) this.counters[params.user] = count;
        else if (params.group) this.counters[params.group] = count;
        else if (params.campaign) this.counters[params.campaign] = count;
        else if (params.deed) this.counters[params.deed] = count;
        else this.counters.global = count;

        return count;
      });
  }

  /**
   * Register a deed as done
   *
   * @param {object} deed
   * @param {object} [group=null]
   *
   * @returns {Promise}
   */
  done(deed, group = null) {
    return this.$http.post(this.baseUrl, {
      deed: deed._id,
      group: has(group, '_id') ? group._id : null
    }).then(extractData);
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

export default ActService;
