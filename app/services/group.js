import _ from 'lodash';
import angular from 'angular';
import config from '../../config';

class Group {
  constructor($http) {
    this.$http = $http;
    this.baseUrl = `${config.serverUrl}/groups`;
  }

  search(query, params) {
    params = _.merge({ query }, params);

    return this.$http.get(this.baseUrl, { params });
  }
}
Group.$inject = ['$http'];

export default angular.module('app.services.group', [])
  .service('Group', Group)
  .name;
