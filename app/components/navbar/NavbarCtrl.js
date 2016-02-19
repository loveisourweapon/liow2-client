/* global $ */

const MIN_QUERY_LENGTH = 3;

export default class NavbarCtrl {
  constructor($location, $q, User, Group, Deed, Act, Modal) {
    Object.assign(this, { $location, $q, User, Group, Deed, Act, Modal });

    this.choices = [];
    this.selected = null;

    this.Act.count();
  }

  /**
   * Refresh list of groups and deeds using search query
   *
   * @param {string} query
   *
   * @returns {Promise|boolean}
   */
  refreshChoices(query) {
    this.choices = [];

    if (query.length < MIN_QUERY_LENGTH) {
      return false;
    }

    return this.$q.all([
      this.Group.search(query, { fields: '_id,name,urlName' }),
      this.Deed.search(query, { fields: '_id,title,urlTitle' })
    ])
      .then(responses => this.choices = responses[0].data.concat(responses[1].data));
  }

  /**
   * Group list of choices
   *
   * @param {object} item
   *
   * @returns {string}
   */
  groupChoices(item) {
    return item.urlName ? 'Groups' : 'Deeds';
  }

  /**
   * Redirect to the selected group or deed page
   *
   * @param {object} item
   */
  select(item) {
    this.selected = null;
    this.$location.path(item.urlName ? `/g/${item.urlName}` : `/d/${item.urlTitle}`);
    this.collapseMenu();
  }

  /**
   * Set the current user's group, redirect to group homepage
   *
   * @param {object} group
   */
  setUserGroup(group) {
    this.User.group = group;
    this.select(group);
  }

  /**
   * Call the jQuery .collapse method
   * TODO: should be in directive?
   */
  collapseMenu() {
    $('#liow-navbar-collapse').collapse('hide');
  }
}

NavbarCtrl.$inject = ['$location', '$q', 'User', 'Group', 'Deed', 'Act', 'Modal'];
