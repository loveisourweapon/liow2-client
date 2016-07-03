class JumbotronController {
  /**
   * Component is initialised
   */
  $onInit() {
    this.styles = {
      'background-image': this.background ? `url(${this.background})` : 'none'
    };
  }
}

export default JumbotronController;
