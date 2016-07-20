import modalHeaderTemplate from './modal-header.html';

const ModalHeaderComponent = {
  bindings: {
    modalTitle: '@',
    onCloseClick: '&',
  },
  template: modalHeaderTemplate,
};

export default ModalHeaderComponent;
