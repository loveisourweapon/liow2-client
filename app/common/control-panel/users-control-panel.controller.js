import merge from 'lodash/merge';

const SEARCH_INPUT_DELAY = 500;
let searchInputTimeout = null;

class UsersControlPanelController {
  /* @ngInject */
  constructor($timeout, User) {
    Object.assign(this, { $timeout, User });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.loadUsers();
  }

  /**
   * Load the users
   *
   * @param {object} [params={}]
   */
  loadUsers(params = {}) {
    let findParams = merge({ limit: 20 }, params);

    this.loading = true;
    this.User.find(findParams)
      .then(response => this.users = response.data)
      .catch(() => null)
      .then(() => this.loading = false);
  }

  /**
   * Start a timer to reload the users list
   *
   * @param {string} query
   */
  search(query) {
    this.$timeout.cancel(searchInputTimeout);
    searchInputTimeout = this.$timeout(() => this.loadUsers({ query }), SEARCH_INPUT_DELAY);
  }
}

export default UsersControlPanelController;
