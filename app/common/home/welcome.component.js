import WelcomeController from './welcome.controller';

const WelcomeComponent = {
  controller: WelcomeController,
  template: `
    <div class="Home__SignupLogin">
      <div class="container container-pad-sm text-center">
        <div class="row">
          <div class="col-xs-12">
            <h3 class="m-t-none">Start changing your world today!</h3>
            <p>Sign up or login to join the Global Campaign or your local group campaign.</p>
            <p>
              <br>
              <button type="button"
                      class="btn btn-primary"
                      ng-click="$ctrl.Modal.openSignup()">
                Sign up
              </button>
              &nbsp;&nbsp; or &nbsp;&nbsp;
              <button type="button"
                      class="btn btn-default"
                      ng-click="$ctrl.Modal.openLogin()">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div><!-- .Home__SignupLogin -->
    
    <deed-list layout="horizontal"></deed-list>
    
    <div class="Home__Welcome">
      <div class="container container-pad">
        <div class="row">
          <div class="col-sm-9">
            <h2>
              The Love is our Weapon Campaign is a youth movement that exists to
              change cities through the love of Jesus by doing strategic practical
              acts of love.
            </h2>
            <p>
              Thousands of people, doing thousands of acts of love, bringing
              change, value, healing and hope throughout cities and communities
              everywhere.
            </p>
            <p>
              <br><br><br>
              <button type="button"
                      class="btn btn-primary"
                      ng-click="$ctrl.Modal.openGroupEdit()">
                Start a Campaign for your Group!
              </button>
            </p>
          </div>
    
          <div class="col-sm-3">
            <h1 class="text-primary m-b-none">
              <span>
                {{ $ctrl.Act.counters.global | number }}
                <span ng-if="!$ctrl.Act.counters.global">&nbsp;</span>
              </span>
            </h1>
            <h4 class="m-none">acts of love</h4>
            <p class="m-t-none">done around the world</p>
    
            <h1 class="text-primary m-b-none">
              <span>
                {{ $ctrl.numberOfGroups | number }}
                <span ng-if="!$ctrl.numberOfGroups">&nbsp;</span>
              </span>
            </h1>
            <h4 class="m-none">groups</h4>
            <p class="m-t-none">serving together</p>
    
            <h1 class="text-primary m-b-none">
              <span>
                {{ $ctrl.numberOfUsers | number }}
                <span ng-if="!$ctrl.numberOfUsers">&nbsp;</span>
              </span>
            </h1>
            <h4 class="m-none">individuals</h4>
            <p class="m-t-none">causing change</p>
          </div>
        </div>
      </div>
    </div><!-- .Home__Welcome -->
    
    <div class="Home__HowTo">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="text-center">
              Running a campaign is as easy as 1, 2, 3.
            </h2>
            <img src="images/welcome-laptop.png">
            <ol>
              <li>
                Sign up<br>
                <small>
                  All you have to do is enter your details and login to
                  join a campaign!
                </small>
              </li>
              <li>Join or Start a Campaign</li>
              <li>Start changing your world!</li>
            </ol>
          </div>
        </div>
      </div>
    </div><!-- .Home__HowTo -->
    
    <div class="Home__Spacer"></div>
    
    <div class="Home__Footer">
      <div class="container container-pad text-center">
        <div class="row">
          <div class="col-xs-12">
            <h1>Love is our Weapon</h1>
            <p>
              <br><br><br>
              <button type="button"
                      class="btn btn-primary"
                      ng-click="$ctrl.Modal.openGroupEdit()">
                Start a Campaign
              </button>
            </p>
          </div>
        </div>
      </div>
    </div><!-- .Home__Footer -->
  `
};

export default WelcomeComponent;
