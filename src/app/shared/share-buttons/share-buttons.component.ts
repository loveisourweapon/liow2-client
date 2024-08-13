import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'ui-share-buttons',
  templateUrl: './share-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareButtonsComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any) {}

  ngAfterViewInit(): void {
    let script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://static.addtoany.com/menu/page.js';
    script.async = true;
    this.renderer.appendChild(this.document.body, script);
  }
}
