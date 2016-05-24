import capitalize from 'lodash/capitalize';

export default class ControlPanelCtrl {
  /* @ngInject */
  constructor($rootScope, $scope, $location, User, Group) {
    Object.assign(this, { $rootScope, $location, User, Group });

    if (!this.User.isAuthenticated()) this.$location.url('/');

    this.baseTitle = 'Control Panel';
    this.activeTab = this.$location.search().active || 'user';
    this.$rootScope.title = this.setPageTitle(this.activeTab);

    let logoutOff = this.User.on('logout', () => this.$location.url('/'));
    $scope.$on('$destroy', logoutOff);
  }

  setActiveTab(newTab) {
    if (newTab !== this.activeTab) {
      this.activeTab = newTab;
      this.$location.search('active', this.activeTab);
      this.setPageTitle(this.activeTab);
    }
  }

  setPageTitle(activeTab) {
    return `${capitalize(activeTab)} | ${this.baseTitle}`;
  }
}
