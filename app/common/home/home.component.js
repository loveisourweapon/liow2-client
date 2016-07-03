import HomeController from './home.controller';

const HomeComponent = {
  controller: HomeController,
  template: `
    <jumbotron jumbo-background="'/images/header-home.jpg'"
               jumbo-classes="videotron">
      <jumbo-content class="Home__Header">
        <div class="text-center">
          <h1 class="m-none">Love is our Weapon</h1>
          <p class="m-t-none">Changing the world one deed at a time</p>
        </div>
    
        <div class="embed-responsive embed-responsive-16by9">
          <youtube-video video-id="'rzvGAGKw8sU'"
                         class="embed-responsive-item"></youtube-video>
        </div>
    
        <div class="text-center m-t-md">
          <button type="button"
                  class="btn btn-primary btn-lg"
                  ng-click="$ctrl.Modal.openGroupEdit()">
            Start a Campaign
          </button>
        </div>
      </jumbo-content>
    </jumbotron>
    
    <welcome ng-if="!$ctrl.User.isAuthenticated()"></welcome>
    
    <home-feed ng-if="$ctrl.User.isAuthenticated()"></home-feed>
  `
};

export default HomeComponent;
