import angular from 'angular';
import MediumEditorComponent from './medium-editor.component';

const mediumEditor = angular
  .module('mediumEditor', [])
  .component('mediumEditor', MediumEditorComponent)
  .name;

export default mediumEditor;
