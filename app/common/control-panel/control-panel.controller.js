const superAdminViews = ['deeds', 'users', 'groups'];

class ControlPanelController {
  /* @ngInject */
  constructor($state, User) {
    Object.assign(this, { $state, User });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    if (
      !this.User.isAuthenticated() ||
      (this.User.current && !this.hasAccess())
    ) this.$state.go('home');

    this.loginOff = this.User.on('login', () => {
      if (!this.hasAccess()) this.$state.go('home');
    });
    this.logoutOff = this.User.on('logout', () => this.$state.go('home'));
  }

  /**
   * Component is being destroyed
   */
  $onDestroy() {
    this.loginOff();
    this.logoutOff();
  }

  /**
   * Check if the current user has access to the current view
   *
   * @returns {boolean}
   */
  hasAccess() {
    return superAdminViews.indexOf(this.view) === -1 || this.User.isSuperAdmin();
  }
}

export default ControlPanelController;
