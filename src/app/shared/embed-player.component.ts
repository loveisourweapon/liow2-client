import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { has } from 'lodash';

@Component({
  selector: 'ui-embed-player',
  template: `<iframe
    [src]="safeUrl"
    style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
    frameborder="0"
  ></iframe>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbedPlayerComponent implements OnChanges {
  @Input() videoId: string;
  @Input() videoUrl: string;

  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    let url = 'about:blank';
    if (has(changes, 'videoId.currentValue') && changes['videoId'].currentValue) {
      url = `https://www.youtube.com/embed/${this.videoId}`;
    } else if (has(changes, 'videoUrl.currentValue') && changes['videoUrl'].currentValue) {
      url = this.videoUrl;
    }

    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
