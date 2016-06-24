import each from 'lodash/each';

// Include template files
import templateHorizontal from './deedListHorizontal.html';
import templateVertical from './deedListVertical.html';

export default class DeedListCtrl {
  /* @ngInject */
  constructor($location, $templateCache, Deed, Act) {
    Object.assign(this, { $location, $templateCache, Deed, Act });
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

    this.$templateCache.put('deedListHorizontal.html', templateHorizontal);
    this.$templateCache.put('deedListVertical.html', templateVertical);
  }

  /**
   * Get the name of the template
   *
   * @returns {string}
   */
  getTemplateName() {
    return this.layout === 'vertical' ?
      'deedListVertical.html' :
      'deedListHorizontal.html';
  }
}
