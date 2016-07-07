import merge from 'lodash/merge';

export class GroupsControlPanelController {
  /* @ngInject */
  constructor(Group, Modal) {
    Object.assign(this, { Group, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.loadGroups();
  }

  /**
   * Load the groups
   *
   * @param {object} [params={}]
   */
  loadGroups(params = {}) {
    let findParams = merge({ limit: 20 }, params);

    this.loading = true;
    this.Group.find(findParams)
      .then(response => this.groups = response.data)
      .catch(() => null)
      .then(() => this.loading = false);
  }

  /**
   * Updated search query
   *
   * @param {object} $event
   */
  onSearch($event) {
    this.loadGroups({ query: $event.query });
  }
}
