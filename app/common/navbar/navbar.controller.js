const MIN_QUERY_LENGTH = 3;

class NavbarController {
  /* @ngInject */
  constructor($q, $state, User, Group, Deed, Act, Modal) {
    Object.assign(this, { $q, $state, User, Group, Deed, Act, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.choices = [];
    this.selected = null;
    this.isCollapsed = true;

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

    return this.$q
      .all([
        this.Group.search(query, { fields: '_id,name,urlName' }),
        this.Deed.search(query, { fields: '_id,title,urlTitle' }),
      ])
      .then(([groups, deeds]) => this.choices = groups.concat(deeds));
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
    this.collapseMenu();

    if (item.urlName) {
      this.$state.go('group', { groupSlug: item.urlName });
    } else {
      this.$state.go('deed', { deedSlug: item.urlTitle });
    }
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
   * Collapse the navbar menu
   */
  collapseMenu() {
    this.isCollapsed = true;
  }
}

export default NavbarController;
