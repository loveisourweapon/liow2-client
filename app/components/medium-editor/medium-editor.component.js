import MediumEditorController from './medium-editor.controller';
import mediumEditorTemplate from './medium-editor.html';

const MediumEditorComponent = {
  bindings: {
    content: '<',
    onContentChanged: '&',
    placeholder: '@',
  },
  controller: MediumEditorController,
  template: mediumEditorTemplate,
};

export default MediumEditorComponent;
