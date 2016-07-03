import CommentFormController from './comment-form.controller';

const CommentFormComponent = {
  bindings: {
    deed: '<',
    group: '<',
    comment: '<',
    act: '<',
    placeholder: '@',
  },
  controller: CommentFormController,
  template: `
    <form ng-submit="$ctrl.save($ctrl.textContent)">
      <div class="form-group">
        <medium-editor content="$ctrl.textContent"
                       on-content-changed="$ctrl.onContentChanged($event)"
                       placeholder="{{ ::$ctrl.placeholder }}"></medium-editor>
    
        <button type="submit"
                class="btn btn-primary m-t-xs"
                ng-disabled="!$ctrl.textContent">
          <i class="fa fa-fw fa-cog fa-spin" ng-show="$ctrl.saving"></i>
          Save
        </button>
      </div>
    </form>
  `
};

export default CommentFormComponent;
