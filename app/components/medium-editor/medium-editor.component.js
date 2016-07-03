import MediumEditorController from './medium-editor.controller';

const MediumEditorComponent = {
  bindings: {
    content: '<',
    onContentChanged: '&',
    placeholder: '@',
  },
  controller: MediumEditorController,
  template: `
    <div class="well well-sm medium-editor m-none">
      <textarea ng-model="$ctrl.content"></textarea>
    </div>
  `
};

export default MediumEditorComponent;
