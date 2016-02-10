import angular from 'angular';

// Load and initialise the YouTube iframe API
import youtubeIframe from 'youtube-iframe';
youtubeIframe.load(() => void 0);

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
