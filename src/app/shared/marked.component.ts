/* tslint:disable: component-selector no-input-rename */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { has } from 'lodash';
import * as marked from 'marked';

@Component({
  selector: '[marked]',
  template: `<div [innerHTML]="content"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkedComponent implements OnChanges {
  @Input('marked') rawContent: string;

  content: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.content = has(changes, 'rawContent.currentValue') && changes['rawContent'].currentValue ?
      this.sanitizer.bypassSecurityTrustHtml(marked(this.rawContent)) :
      '';
  }
}
