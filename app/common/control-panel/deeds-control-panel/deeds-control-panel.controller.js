export class DeedsControlPanelController {
  /* @ngInject */
  constructor(Deed, Modal) {
    Object.assign(this, { Deed, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.loadDeeds();
  }

  /**
   * Load all of the deeds
   * Note: in the future we might not want to preload ALL deeds
   */
  loadDeeds() {
    this.loading = true;
    this.Deed.find()
      .then(response => this.deeds = response.data)
      .catch(() => null)
      .then(() => this.loading = false);
  }
}
