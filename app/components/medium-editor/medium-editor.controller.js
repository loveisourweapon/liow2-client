import MediumEditor from 'medium-editor';
import toMarkdown from 'to-markdown';
import showdown from 'showdown';
const converter = new showdown.Converter();

class MediumEditorController {
  /* @ngInject */
  constructor($element, $q) {
    Object.assign(this, { $element, $q });
  }

  /**
   * All elements compiled and linked
   */
  $postLink() {
    this.editor = new MediumEditor(this.$element.find('textarea'), {
      placeholder: { text: this.placeholder || 'Enter a message...', hideOnClick: false },
      toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist'] },
      buttonLabels: 'fontawesome',
    });

    if (this.content) {
      this.editor.setContent(converter.makeHtml(this.content));
    }

    this.editor.subscribe('editableInput', (event, editable) => {
      this.$q
        .resolve(toMarkdown(editable.innerHTML, {
          converters: [{
            // Remove spans and divs
            filter: function (node) {
              return node.nodeName === 'SPAN' || node.nodeName === 'DIV';
            },
            replacement: function (content) {
              return content;
            }
          }]
        }))
        .then(content => this.onContentChanged({ $event: { content } }));
    });
  }

  /**
   * Component is being destroyed
   */
  $onDestroy() {
    this.editor.destroy();
  }
}

export default MediumEditorController;
