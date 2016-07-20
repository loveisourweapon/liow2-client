import angular from 'angular';
import jsonpatch from 'fast-json-patch';

class GroupControlPanelController {
  /* @ngInject */
  constructor($rootScope, $state, $q, Alertify, User, Group, Act, Modal) {
    Object.assign(this, { $rootScope, $state, $q, Alertify, User, Group, Act, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    if (!(
      this.User.isMemberOfGroup(this.group) ||
      this.User.isSuperAdmin()
    )) {
      return this.$state.go('controlPanel.user');
    }

    this.Act.count({ group: this.group._id });
    this.$rootScope.title = `${this.group.name} | Control Panel`;

    this.User.find({ groups: this.group._id, count: true })
      .then(users => this.group.members = users)
      .catch(() => null);
  }

  /**
   * Component bindings updated
   *
   * @param {object} changes
   */
  $onChanges(changes) {
    if (changes.group) {
      this.group = angular.copy(this.group);
    }
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
      `, 'Leave Group');
    } else if (this.Group.isAdmin(group, user)) {
      return this.Modal.openAlert(`
        You are currently an admin of **${group.name}**.
        
        You'll need to remove yourself as an admin before leaving.
      `, 'Leave Group');
    } else {
      const cancelConfirm = Symbol('cancelConfirm');
      return this.Modal.openConfirm(`Are you sure you want to leave **${group.name}**?`, 'Leave Group')
        .catch(() => this.$q.reject(cancelConfirm))
        .then(() => {
          let observer = jsonpatch.observe(user);
          user.groups.splice(user.groups.indexOf(group._id));
          return this.User.update(user, jsonpatch.generate(observer));
        })
        .then(() => {
          this.Alertify.success(`Left group <strong>${group.name}</strong>`);
          this.$state.go('controlPanel.user');
        })
        .catch(reason => (reason !== cancelConfirm) && user.groups.push(group));
    }
  }
}

export default GroupControlPanelController;
