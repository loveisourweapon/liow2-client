import angular from 'angular';

class DeedController {
  /* @ngInject */
  constructor($rootScope, Alertify, User, Group, Deed, Act, Feed, Modal) {
    Object.assign(this, { $rootScope, Alertify, User, Group, Deed, Act, Feed, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = this.deed.title;
    this.Act.count({ deed: this.deed._id });
    this.Feed.update({ refresh: true });
  }

  /**
   * Component bindings updated
   *
   * @param {object} changes
   */
  $onChanges(changes) {
    if (changes.deed) {
      this.deed = angular.copy(this.deed);
      this.Deed.current = this.deed;
    }
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

export default DeedController;
