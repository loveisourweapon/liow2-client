import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  selector: 'ui-medium-editor',
  template: ``,
})
export class MediumEditorStubComponent {
  @Input() content: string;
  @Input() placeholder: string;
  @Output() change = new EventEmitter();
}

@Component({
  selector: 'ui-switch',
  template: ``,
})
export class SwitchStubComponent {
  @Input() checked: boolean;
  @Output() change = new EventEmitter();
}

@Component({
  selector: 'liow-user-picker',
  template: ``,
})
export class UserPickerStubComponent {
  @Input() userList: any;
  @Input() selectedIds: string[];
  @Input() lockedIds = [];
  @Input() disabled = false;
  @Output() change = new EventEmitter<string[]>();
}

@Component({
  selector: 'ui-youtube-player',
  template: ``,
})
export class YoutubePlayerStubComponent {
  @Input() videoId: string;
  @Input() videoUrl: string;
}
