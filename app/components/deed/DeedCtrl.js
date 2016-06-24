export default class DeedCtrl {
  /* @ngInject */
  constructor($rootScope, Alertify, User, Group, Deed, Act, Feed, Modal) {
    Object.assign(this, { $rootScope, Alertify, User, Group, Deed, Act, Feed, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.loadDeed(this.deedSlug)
      .then(() => this.$rootScope.title = this.Deed.current ? this.Deed.current.title : null);
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
        this.Feed.update({ refresh: true });
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
        this.Feed.update();
        this.Alertify.success('Deed done!');
      })
      .catch(() => this.Alertify.error('Failed registering deed'))
      .then(() => this.doing = false);
  }
}
