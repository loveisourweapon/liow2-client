import feedItemTemplate from './feed-item.html';

const FeedItemComponent = {
  bindings: {
    item: '<',
  },
  require: {
    feed: '^^',
  },
  template: feedItemTemplate,
};

export default FeedItemComponent;
