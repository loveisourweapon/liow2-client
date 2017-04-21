import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Group } from '../../core/models';
import { StateService } from '../../core/services';
import { identifyBy } from '../../shared';

@Component({
  selector: 'liow-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeedComponent {
  identifyBy = identifyBy;

  constructor(
    public state: StateService,
  ) { }

  listGroupIds(groups: Group[]): string|null {
    return (groups && groups.length) ? groups.map((group: Group) => group._id).join(',') : null;
  }
}
