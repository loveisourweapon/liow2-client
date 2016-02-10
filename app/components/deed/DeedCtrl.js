export default class DeedCtrl {
  constructor($routeParams, User, Deed, Modal) {
    Object.assign(this, { User, Deed, Modal });

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
}

DeedCtrl.$inject = ['$routeParams', 'User', 'Deed', 'Modal'];
