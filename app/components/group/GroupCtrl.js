export default class GroupCtrl {
  constructor($routeParams, Group) {
    Object.assign(this, { Group });

    this.loadGroup($routeParams.group);
  }

  /**
   * Load a group by it's urlName
   *
   * @param {string} urlName
   */
  loadGroup(urlName) {
    this.loading = true;
    this.Group
      .findOne({ urlName })
      .then((group) => {
        this.group = group;
      })
      .catch((error) => {
        this.error = error.message;
      })
      .then(() => this.loading = false);
  }
}

GroupCtrl.$inject = ['$routeParams', 'Group'];
