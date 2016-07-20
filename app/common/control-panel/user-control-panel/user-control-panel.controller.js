import angular from 'angular';
import jsonpatch from 'fast-json-patch';

class UserControlPanelController {
  /* @ngInject */
  constructor($rootScope, Alertify, User, Act, Modal) {
    Object.assign(this, { $rootScope, Alertify, User, Act, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = 'User | Control Panel';
    this.Act.count({ user: this.user._id });
  }

  /**
   * Component bindings updated
   *
   * @param {object} changes
   */
  $onChanges(changes) {
    if (changes.user) {
      this.user = angular.copy(this.user);
    }
  }

  /**
   * Toggle the user name edit form
   *
   * @param {object} user
   */
  toggleEditName(user) {
    this.editingName = !this.editingName;

    if (this.editingName) {
      this.observer = jsonpatch.observe(user);
    } else {
      jsonpatch.unobserve(user, this.observer);
    }
  }

  /**
   * Save the user's name
   *
   * @param {object} user
   */
  saveName(user) {
    this.User.update(user, jsonpatch.generate(this.observer))
      .then(user => {
        this.user = angular.copy(user);
        this.Alertify.success('Updated name');
      })
      .catch(() => this.Alertify.error('Failed updating name'))
      .then(() => this.toggleEditName(user));
  }

  /**
   * Send confirm email address email
   *
   * @param {string} email
   */
  sendConfirmEmail(email) {
    this.sending = true;
    this.User.sendConfirmEmail(email)
      .then(() => this.Alertify.success(`Sent confirmation email to <strong>${email}</strong>`))
      .catch(() => this.Alertify.error('Failed sending confirmation email'))
      .then(() => this.sending = false);
  }
}

export default UserControlPanelController;
