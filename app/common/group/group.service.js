import angular from 'angular';
import has from 'lodash/has';
import find from 'lodash/find';
import merge from 'lodash/merge';
import first from 'lodash/first';

let currentGroup = null;

class GroupService {
  /* @ngInject */
  constructor($http, $q, config, User) {
    Object.assign(this, { $http, $q, User });

    this.baseUrl = `${config.serverUrl}/groups`;
  }

  /**
   * Find groups by params
   *
   * @param {object} [params={}]
   *
   * @returns {Promise}
   */
  find(params = {}) {
    return this.$http.get(this.baseUrl, { params }).then(extractData);
  }

  /**
   * Find a single group by params
   *
   * @param {object} params
   *
   * @returns {Promise}
   */
  findOne(params) {
    return this.find(params)
      .then(groups => {
        if (groups.length === 1) {
          return first(groups);
        } else {
          return this.$q.reject('Group not found');
        }
      });
  }

  /**
   * Search for groups with a search query and optional params
   *
   * @param {string} query
   * @param {object} params
   *
   * @returns {Promise}
   */
  search(query, params) {
    params = merge({ query }, params);

    return this.find(params);
  }

  /**
   * Save a new or existing group
   *
   * @param {object} group
   *
   * @returns {Promise}
   */
  save(group) {
    if (has(group, '_id')) {
      return this.$http.put(`${this.baseUrl}/${group._id}`, group).then(extractData);
    } else {
      return this.$http.post(this.baseUrl, group).then(extractData);
    }
  }

  /**
   * Check if a user is an admin of a group
   *
   * @param {object} group
   * @param {object} user
   *
   * @returns {boolean}
   */
  isAdmin(group, user) {
    return has(group, 'admins') && has(user, '_id') && ~group.admins.indexOf(user._id);
  }

  /**
   * Set the current group
   *
   * @param {object|null} group
   */
  set current(group) {
    currentGroup = angular.copy(group);

    // If the current user is a member of this group, make it their active group
    if (this.User.current && find(this.User.current.groups, ['id', group._id])) {
      this.User.group = group;
    }
  }

  /**
   * Get the current group
   *
   * @returns {object|null}
   */
  get current() {
    return currentGroup;
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

export default GroupService;
