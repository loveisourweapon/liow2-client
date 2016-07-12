import capitalize from 'lodash/capitalize';

const superAdminViews = ['deeds', 'users', 'groups'];

export class ControlPanelController {
  /* @ngInject */
  constructor($rootScope, $state, User) {
    Object.assign(this, { $rootScope, $state, User });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.view = this.$state.current.url.substr(1);
    this.baseTitle = 'Control Panel';
    this.$rootScope.title = this.getPageTitle(this.view);

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
   * Get the page title for the browser window
   *
   * @param {string} view
   *
   * @returns {string}
   */
  getPageTitle(view) {
    return `${capitalize(view)} | ${this.baseTitle}`;
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
