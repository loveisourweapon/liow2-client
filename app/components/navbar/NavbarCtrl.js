const MIN_QUERY_LENGTH = 3;

export default class NavbarCtrl {
  constructor($location, User, Group, Modal) {
    Object.assign(this, { $location, User, Group, Modal });

    this.groups = [];
    this.group = null;
  }

  /**
   * Refresh list of groups using search query
   *
   * @param {string} query
   *
   * @returns {Promise|boolean}
   */
  refreshGroups(query) {
    this.groups = [];

    if (query.length < MIN_QUERY_LENGTH) {
      return false;
    }

    return this.Group
      .search(query, { fields: '_id,name,urlName' })
      .then(response => this.groups = response.data);
  }

  /**
   * Redirect to the selected group homepage
   *
   * @param {object} item
   */
  selectGroup(item) {
    this.group = null;
    this.$location.path(`/g/${item.urlName}`);
  }
}

NavbarCtrl.$inject = ['$location', 'User', 'Group', 'Modal'];
