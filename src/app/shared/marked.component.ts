import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { has } from 'lodash';
import * as marked from 'marked';

@Component({
  selector: 'ui-marked',
  template: `<div [innerHTML]="htmlContent"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkedComponent implements OnChanges {
  @Input() content: string;

  htmlContent: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.htmlContent = has(changes, 'content.currentValue') && changes['content'].currentValue ?
      this.sanitizer.bypassSecurityTrustHtml(marked(this.content)) :
      '';
  }
}
