import DeedController from './deed.controller';
import deedTemplate from './deed.html';

const DeedComponent = {
  bindings: {
    deed: '<',
  },
  controller: DeedController,
  template: deedTemplate,
};

export default DeedComponent;
