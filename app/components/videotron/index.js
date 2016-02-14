import angular from 'angular';

// Module dependencies
import angularYoutube from 'angular-youtube-embed';

// Component dependencies
import videotronTpl from './videotron.html';

export default angular.module('app.components.videotron', [angularYoutube])
  .component('videotron', {
    template: videotronTpl,
    bindings: {
      videoId: '=',
      videoUrl: '='
    }
  })
  .name;
