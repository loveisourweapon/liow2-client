import JumbotronController from './jumbotron.controller';

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
  template: `
    <div class="jumbotron {{ $ctrl.classes }}"
         ng-style="$ctrl.styles">
      <div class="container">
        <div ng-transclude="content">
          <div class="jumbotron-image"
               ng-if="$ctrl.image">
            <img ng-src="{{ $ctrl.image }}"
                 class="img-responsive img-circle">
          </div>

          <h1 class="jumbotron-title"
              ng-transclude="title"></h1>

          <p class="jumbotron-text"
             ng-transclude="text"></p>
        </div>
      </div>
    </div>
  `,
};

export default JumbotronComponent;
