export default class JumbotronCtrl {
  constructor() {
    this.styles = {
      'background-image': this.background ? `url(${this.background})` : 'none'
    };
  }
}
