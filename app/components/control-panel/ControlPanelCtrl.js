import capitalize from 'lodash/capitalize';

let superAdminTabs = ['deeds', 'users', 'groups'];

export default class ControlPanelCtrl {
  /* @ngInject */
  constructor($rootScope, $scope, $location, User, Group) {
    Object.assign(this, { $rootScope, $location, User, Group });

    this.baseTitle = 'Control Panel';
    this.activeTab = this.$location.search().active || 'user';
    this.$rootScope.title = this.getPageTitle(this.activeTab);

    if (
      !this.User.isAuthenticated() ||
      (this.User.current && !this.hasAccess())
    ) this.$location.url('/');

    let loginOff = this.User.on('login', () => {
      if (!this.hasAccess()) this.$location.url('/');
    });
    let logoutOff = this.User.on('logout', () => this.$location.url('/'));
    $scope.$on('$destroy', () => {
      loginOff();
      logoutOff();
    });
  }

  /**
   * Change to a new active tab
   *
   * @param {string} newTab
   */
  setActiveTab(newTab) {
    if (newTab !== this.activeTab) {
      this.activeTab = newTab;
      this.$location.search('active', this.activeTab);
      this.$rootScope.title = this.getPageTitle(this.activeTab);
    }
  }

  /**
   * Get the page title for the browser window
   *
   * @param {string} activeTab
   *
   * @returns {string}
   */
  getPageTitle(activeTab) {
    return `${capitalize(activeTab)} | ${this.baseTitle}`;
  }

  /**
   * Check if the current user has access to the current tab
   *
   * @returns {boolean}
   */
  hasAccess() {
    return superAdminTabs.indexOf(this.activeTab) === -1 || this.User.isSuperAdmin();
  }
}
