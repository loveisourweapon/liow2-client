import each from 'lodash/each';

export default class DeedListController {
  /* @ngInject */
  constructor($location, Deed, Act) {
    Object.assign(this, { $location, Deed, Act });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.loading = true;
    this.Deed.find({ fields: '_id,logo,title,urlTitle' })
      .then(response => {
        this.deeds = response.data;
        each(this.deeds, deed => this.Act.count({ deed: deed._id }));
      })
      .catch(() => null)
      .then(() => this.loading = false);
  }
}
