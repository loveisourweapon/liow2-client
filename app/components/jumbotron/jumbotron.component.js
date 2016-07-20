import JumbotronController from './jumbotron.controller';
import jumbotronTemplate from './jumbotron.html';

const JumbotronComponent = {
  bindings: {
    image: '<jumboImage',
    background: '<jumboBackground',
    classes: '@jumboClasses',
  },
  transclude: {
    content: '?jumboContent',
    title: '?jumboTitle',
    text: '?jumboText',
  },
  controller: JumbotronController,
  template: jumbotronTemplate,
};

export default JumbotronComponent;
