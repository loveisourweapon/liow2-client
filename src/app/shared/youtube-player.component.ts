import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { has } from 'lodash';

@Component({
  selector: 'ui-youtube-player',
  template: `<iframe [src]="safeUrl" frameborder="0" allowfullscreen></iframe>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubePlayerComponent implements OnChanges {
  @Input() videoId: string;
  @Input() videoUrl: string;

  safeUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

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
