import jsonpatch from 'fast-json-patch';

export default class GroupControlPanelCtrl {
  /* @ngInject */
  constructor($rootScope, $location, Alertify, User, Group, Act, Modal) {
    Object.assign(this, { $rootScope, $location, Alertify, User, Group, Act, Modal });

    this.loadGroup(this.groupId);
  }

  /**
   * Load the group by ID
   *
   * @param {string} groupId
   *
   */
  loadGroup(groupId) {
    this.loading = true;
    this.Group.findOne({ _id: groupId })
      .then(group => {
        this.group = group;
        if (!(
          this.Group.isAdmin(this.group, this.User.current) ||
          this.User.isSuperAdmin()
        )) {
          this.$location.url('/');
          return Promise.reject();
        }

        this.Act.count({ group: this.group._id });
        this.$rootScope.title = this.group.name;

        return this.User.find({ groups: this.group._id, count: true });
      })
      .then(response => this.group.members = response.data)
      .catch(() => null)
      .then(() => this.loading = false);
  }

  /**
   * Open the group edit modal
   *
   * @param {object} group
   */
  updateGroup(group) {
    this.Modal.openGroupEdit('update', group)
      .then(group => this.group = group)
      .catch(() => null);
  }

  /**
   * Remove the user from the group
   *
   * @param {object} user
   * @param {object} group
   */
  leaveGroup(user, group) {
    if (group.owner === user._id) {
      return this.Modal.openAlert(`
        You are the current owner of **${group.name}**.
        
        You'll need to make someone else the owner before leaving.
      `);
    } else if (this.Group.isAdmin(group, user)) {
      return this.Modal.openAlert(`
        You are currently an admin of **${group.name}**.
        
        You'll need to remove yourself as an admin before leaving.
      `);
    } else {
      return this.Modal.openConfirm(`Are you sure you want to leave **${group.name}**?`)
        .then(() => {
          let observer = jsonpatch.observe(user);
          user.groups.splice(user.groups.indexOf(group._id));
          return this.User.update(user, jsonpatch.generate(observer));
        })
        .then(() => this.Alertify.success(`Left group <strong>${group.name}</strong>`))
        .then(() => this.$location.search('active', 'user'))
        .catch(() => user.groups.push(group));
    }
  }
}
