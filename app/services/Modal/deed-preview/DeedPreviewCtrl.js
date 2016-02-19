export default class DeedPreviewCtrl {
  constructor($uibModalInstance, Deed, deedId) {
    Object.assign(this, { $uibModalInstance, Deed });

    this.error = null;

    this.loadDeed(deedId);
  }

  /**
   * Load the deed by ID
   *
   * @param {string} deedId
   */
  loadDeed(deedId) {
    this.loading = true;
    this.Deed.get(deedId)
      .then(response => this.deed = response.data)
      .catch(response => this.error = 'Deed not found')
      .then(() => this.loading = false);
  }
}

DeedPreviewCtrl.$inject = ['$uibModalInstance', 'Deed', 'deedId'];
