export default class FeedCtrl {
  constructor(User) {
    Object.assign(this, { User });
  }
}

FeedCtrl.$inject = ['User'];
