const MIN_QUERY_LENGTH = 3;

export default class NavbarCtrl {
  constructor($location, Group, Modal) {
    Object.assign(this, { $location, Group, Modal });

    this.groups = [];
    this.group = null;
  }

  refreshGroups(query) {
    this.groups = [];

    if (query.length < MIN_QUERY_LENGTH) {
      return false;
    }

    return this.Group
      .search(query, { fields: '_id,name,urlName' })
      .then((response) => {
        this.groups = response.data;
      });
  }

  selectGroup(item) {
    this.group = null;
    this.$location.path(`/g/${item.urlName}`);
  }
}

NavbarCtrl.$inject = ['$location', 'Group', 'Modal'];
