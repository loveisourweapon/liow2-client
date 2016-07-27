import angular from 'angular'
import CommentsControlPanelComponent from './comments-control-panel.component';

const commentsControlPanel = angular
  .module('commentsControlPanel', [])
  .component('commentsControlPanel', CommentsControlPanelComponent)
  .name;

export default commentsControlPanel;
