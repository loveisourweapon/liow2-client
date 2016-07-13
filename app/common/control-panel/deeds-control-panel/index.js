import angular from 'angular';
import DeedsControlPanelComponent from './deeds-control-panel.component';

const deedsControlPanel = angular
  .module('deedsControlPanel', [])
  .component('deedsControlPanel', DeedsControlPanelComponent)
  .config($stateProvider => {
    'ngInject';

    $stateProvider.state('controlPanel.deeds', {
      url: '/deeds',
      views: {
        section: { component: 'deedsControlPanel' },
      },
      resolve: {
        deeds: /* @ngInject */ Deed => Deed.find(),
      }
    });
  })
  .name;

export default deedsControlPanel;
