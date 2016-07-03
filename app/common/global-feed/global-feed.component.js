import GlobalFeedController from './global-feed.controller';

const GlobalFeedComponent = {
  controller: GlobalFeedController,
  template: `
    <jumbotron jumbo-background="'/images/header.jpg'"></jumbotron>

    <div class="container container-pad">
      <div class="row">
        <div class="col-xs-12">
          <h3 class="m-t-none m-b-md">
            <i class="fa fa-fw fa-list"></i>
            Global Activity Feed
          </h3>
    
          <feed criteria="{ 'target.group': 'null' }"></feed>
        </div>
      </div>
    </div>
  `
};

export default GlobalFeedComponent;
