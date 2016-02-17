import _ from 'lodash';
import angular from 'angular';

// Module dependencies
import config from '../config';

class Act {
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
   * @returns {HttpPromise}
   */
  count(params = {}) {
    params = _.defaults(params, { count: true });

    return this.$http.get(this.baseUrl, { params })
      .then(response => {
        response.data = Number(response.data);

        if (params.user) this.counters[params.user] = response.data;
        else if (params.group) this.counters[params.group] = response.data;
        else if (params.campaign) this.counters[params.campaign] = response.data;
        else if (params.deed) this.counters[params.deed] = response.data;
        else this.counters.global = response.data;

        return response;
      });
  }

  /**
   * Register a deed as done
   *
   * @param {object} deed
   * @param {object} [group=null]
   *
   * @returns {HttpPromise}
   */
  done(deed, group = null) {
    return this.$http.post(this.baseUrl, {
      deed: deed._id,
      group: _.has(group, '_id') ? group._id : null
    });
  }
}

Act.$inject = ['$http', 'config'];

export default angular.module('app.services.Act', [config])
  .service('Act', Act)
  .name;
