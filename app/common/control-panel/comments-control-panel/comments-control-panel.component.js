import CommentsControlPanelController from './comments-control-panel.controller';
import commentsControlPanelTemplate from './comments-control-panel.html';

const CommentsControlPanelComponent = {
  bindings: {
    comments: '<',
    numberOfComments: '<',
    page: '<',
    pageSize: '<',
    title: '<browserTitle',
  },
  controller: CommentsControlPanelController,
  template: commentsControlPanelTemplate,
};

export default CommentsControlPanelComponent;
