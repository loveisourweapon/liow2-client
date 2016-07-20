import FeedController from './feed.controller';
import feedTemplate from './feed.html';

const FeedComponent = {
  bindings: {
    criteria: '<',
  },
  controller: FeedController,
  template: feedTemplate,
};

export default FeedComponent;
