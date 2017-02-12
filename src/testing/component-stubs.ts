import { Component, Input } from '@angular/core';

@Component({
  selector: 'liow-deed-list',
  template: ``,
})
export class DeedListStubComponent {
  @Input() layout: string;
}

@Component({
  selector: 'liow-feed',
  template: ``,
})
export class FeedStubComponent {
  @Input() criteria: any;
}

@Component({
  selector: 'liow-jumbotron',
  template: ``,
})
export class JumbtronStubComponent {
  @Input() image: string;
  @Input() background: string;
  @Input() classes: string;
}

@Component({
  selector: 'ui-loading-spinner',
  template: ``,
})
export class LoadingSpinnerStubComponent {
  @Input() size: string;
  @Input() classes: string[];
}

@Component({
  selector: 'ui-marked',
  template: ``,
})
export class MarkedStubComponent {
  @Input() content: string;
}

@Component({
  selector: 'ui-youtube-player',
  template: ``,
})
export class YoutubePlayerStubComponent {
  @Input() videoId: string;
  @Input() videoUrl: string;
}
