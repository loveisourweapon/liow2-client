class DeedPreviewController {
  /* @ngInject */
  constructor($uibModalInstance, Deed, Act, deedId) {
    Object.assign(this, { $uibModalInstance, Act, Deed });

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
      .then(deed => {
        this.deed = deed;
        this.Act.count({ deed: this.deed._id });
      })
      .catch(response => this.error = 'Deed not found')
      .then(() => this.loading = false);
  }
}

export default DeedPreviewController;
