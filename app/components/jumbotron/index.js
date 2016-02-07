import angular from 'angular';

// Component dependencies
import JumbotronCtrl from './JumbotronCtrl';
import jumbotronTpl from './jumbotron.html';

export default angular.module('app.components.jumbotron', [])
  .directive('jumbotron', () => {
    return {
      restrict: 'E',
      scope: {
        image: '@',
        background: '@',
        title: '@',
        text: '@'
      },
      bindToController: true,
      controller: JumbotronCtrl,
      controllerAs: 'JumbotronCtrl',
      template: jumbotronTpl
    };
  })
  .name;
