import each from 'lodash/each';

// Include template files
import templateVertical from './deed-list-vertical.template';
import templateHorizontal from './deed-list-horizontal.template';

export default class DeedListController {
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

    this.$templateCache.put('deed-list-vertical.template', templateVertical);
    this.$templateCache.put('deed-list-horizontal.template', templateHorizontal);
  }

  /**
   * Get the name of the template
   *
   * @param {string} [layout='vertical']
   *
   * @returns {string}
   */
  getTemplateName(layout = 'vertical') {
    return layout === 'vertical' ?
      'deed-list-vertical.template' :
      'deed-list-horizontal.template';
  }
}
