export default class DeedListController {
  /* @ngInject */
  constructor($q, Deed, Act) {
    Object.assign(this, { $q, Deed, Act });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.loading = true;
    this.$q
      .all([
        this.Deed.find({ fields: '_id,logo,title,urlTitle' }),
        this.Deed.countAll(),
      ])
      .then(([deeds,]) => this.deeds = deeds)
      .catch(() => null)
      .then(() => this.loading = false);
  }
}
