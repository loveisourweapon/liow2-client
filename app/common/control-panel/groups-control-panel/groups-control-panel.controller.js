import merge from 'lodash/merge';

const SEARCH_INPUT_DELAY = 500;
let searchInputTimeout = null;

export class GroupsControlPanelController {
  /* @ngInject */
  constructor($timeout, Group, Modal) {
    Object.assign(this, { $timeout, Group, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.loadGroups();
  }

  /**
   * Load the groups
   *
   * @param {object} [params={}]
   */
  loadGroups(params = {}) {
    let findParams = merge({ limit: 20 }, params);

    this.loading = true;
    this.Group.find(findParams)
      .then(response => this.groups = response.data)
      .catch(() => null)
      .then(() => this.loading = false);
  }

  /**
   * Start a timer to reload the groups list
   *
   * @param {string} query
   */
  search(query) {
    this.$timeout.cancel(searchInputTimeout);
    searchInputTimeout = this.$timeout(() => this.loadGroups({ query }), SEARCH_INPUT_DELAY);
  }
}
