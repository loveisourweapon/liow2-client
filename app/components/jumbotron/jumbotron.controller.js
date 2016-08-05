class JumbotronController {
  /* @ngInject */
  constructor($element) {
    Object.assign(this, { $element });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.styles = {
      'background-image': this.background ? `url(${this.background})` : 'none'
    };
  }

  /**
   * All elements compiled and linked
   */
  $postLink() {
    if (this.$element.find('jumbo-content').length) {
      this.hasJumboContent = true;
    }
  }
}

export default JumbotronController;
