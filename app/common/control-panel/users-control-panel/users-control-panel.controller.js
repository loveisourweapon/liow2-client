import merge from 'lodash/merge';

export class UsersControlPanelController {
  /* @ngInject */
  constructor(User) {
    Object.assign(this, { User });
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
   * Updated search query
   *
   * @param {object} $event
   */
  onSearch($event) {
    this.loadUsers({ query: $event.query });
  }
}
