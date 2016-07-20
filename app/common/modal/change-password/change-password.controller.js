import jsonpatch from 'fast-json-patch';

class ChangePasswordController {
  /* @ngInject */
  constructor($uibModalInstance, Alertify, User, user) {
    Object.assign(this, { $uibModalInstance, Alertify, User, user });
  }

  /**
   * Save the new password
   *
   * @param {object} user
   * @param {string} currentPassword
   * @param {string} newPassword
   */
  save(user, currentPassword, newPassword) {
    let toSave = {};
    let observer = jsonpatch.observe(toSave);
    Object.assign(toSave, { currentPassword, newPassword });

    this.saving = true;
    this.error = null;
    this.User.update(user, jsonpatch.generate(observer))
      .then(() => this.Alertify.success('Password changed'))
      .then(() => this.$uibModalInstance.close())
      .catch(response => this.error = response.data.message)
      .then(() => this.saving = false);
  }
}

export default ChangePasswordController;
