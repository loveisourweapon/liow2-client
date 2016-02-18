export default class DeedCtrl {
  constructor($rootScope, $routeParams, Alertify, User, Group, Deed, Act, Modal) {
    Object.assign(this, { Alertify, User, Group, Deed, Act, Modal });

    this.loadDeed($routeParams.deed)
      .then(() => $rootScope.title = this.Deed.current ? this.Deed.current.title : null);
  }

  /**
   * Load a deed by urlTitle
   *
   * @param {string} urlTitle
   */
  loadDeed(urlTitle) {
    this.loading = true;
    return this.Deed
      .findOne({ urlTitle })
      .then(deed => {
        this.Deed.current = deed;
        this.Act.count({ deed: deed._id });
      })
      .catch(error => {
        this.error = error.message;
        this.Deed.current = null;
      })
      .then(() => this.loading = false);
  }

  /**
   * Register a deed as done
   *
   * @param {object} deed
   * @param {object} [group=null]
   */
  done(deed, group = null) {
    this.doing = true;
    this.Act.done(deed, group)
      .then(() => {
        this.Act.count();
        this.Act.count({ deed: deed._id });
        this.Alertify.success('Deed done!');
      })
      .catch(() => this.Alertify.error('Failed registering deed'))
      .then(() => this.doing = false);
  }
}

DeedCtrl.$inject = ['$rootScope', '$routeParams', 'Alertify', 'User', 'Group', 'Deed', 'Act', 'Modal'];
