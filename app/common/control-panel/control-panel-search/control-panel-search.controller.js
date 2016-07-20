import first from 'lodash/first';

class ControlPanelSearchController {
  /* @ngInject */
  constructor($element) {
    Object.assign(this, { $element });
  }

  /**
   * All elements compiled and linked
   */
  $postLink() {
    if (first(this.$element).hasAttribute('autofocus')) {
      first(this.$element.find('input')).focus();
    }
  }
}

export default ControlPanelSearchController;
