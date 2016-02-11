export default class DeedCtrl {
  constructor($routeParams, User, Group, Deed, Act, Modal) {
    Object.assign(this, { User, Group, Deed, Act, Modal });

    this.loadDeed($routeParams.deed);
  }

  /**
   * Load a deed by urlTitle
   *
   * @param {string} urlTitle
   */
  loadDeed(urlTitle) {
    this.loading = true;
    this.Deed
      .findOne({ urlTitle })
      .then(deed => this.Deed.current = deed)
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
      .then(response => console.log('DONE!', response))
      .catch(error => console.log('ERROR!', error))
      .then(() => this.doing = false);
  }
}

DeedCtrl.$inject = ['$routeParams', 'User', 'Group', 'Deed', 'Act', 'Modal'];
