import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import * as MediumEditor from 'medium-editor';
import * as toMarkdown from 'to-markdown';
import * as showdown from 'showdown';
const converter = new showdown.Converter();

@Component({
  selector: 'ui-medium-editor',
  templateUrl: './medium-editor.component.html',
  styleUrls: ['./medium-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MediumEditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() content: string;
  @Input() placeholder = 'Enter a message...';
  @Output() change = new EventEmitter<string>();

  private editor: any;

  constructor(
    private element: ElementRef,
  ) { }

  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.element.nativeElement.querySelector('textarea'), {
      placeholder: { text: this.placeholder, hideOnClick: false },
      toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist'] },
      buttonLabels: 'fontawesome',
    });

    if (this.content) {
      this.editor.setContent(converter.makeHtml(String(this.content)));
    }

    this.editor.subscribe('editableInput', (event: Event, editable: HTMLElement) =>
      this.change.emit(toMarkdown(editable.innerHTML, {
        converters: [{
          // Remove spans and divs
          filter: function (node) {
            return node.nodeName === 'SPAN' || node.nodeName === 'DIV';
          },
          replacement: function (content) {
            return content;
          },
        }]
      })));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !this.editor || // editor isn't initialised
      !changes['content'] || // no change to content
      this.element.nativeElement.querySelectorAll(':focus').length // editor is currently focused/typing
    ) { return; }

    let newContent = changes['content'].currentValue;
    if (newContent === undefined || newContent === null) {
      newContent = '';
    }
    this.editor.setContent(converter.makeHtml(String(newContent)));
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
