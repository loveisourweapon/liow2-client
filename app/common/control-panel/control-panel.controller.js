import capitalize from 'lodash/capitalize';

const superAdminViews = ['deeds', 'users', 'groups'];

class ControlPanelController {
  /* @ngInject */
  constructor($rootScope, $location, User, Group) {
    Object.assign(this, { $rootScope, $location, User, Group });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.baseTitle = 'Control Panel';
    this.groupId = this.$location.search().groupId;
    this.$rootScope.title = this.getPageTitle(this.view);

    if (
      !this.User.isAuthenticated() ||
      (this.User.current && !this.hasAccess())
    ) this.$location.url('/');

    this.loginOff = this.User.on('login', () => {
      if (!this.hasAccess()) this.$location.url('/');
    });
    this.logoutOff = this.User.on('logout', () => this.$location.url('/'));
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

export default ControlPanelController;
