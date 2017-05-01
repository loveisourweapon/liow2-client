import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { has, isEqual } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { Campaign, Deed, DeedId, Group } from '../../core/models';
import { DeedService } from '../../core/services/deed.service';
import { StateService } from '../../core/services/state.service';
import { SearchParams } from '../../shared';

@Component({
  selector: 'liow-deed-list',
  templateUrl: './deed-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListComponent implements OnChanges, OnInit, OnDestroy {
  @Input() layout: string;
  @Input() alwaysGlobal = false;
  @Input() includeIds: DeedId[];

  deeds$: Observable<Deed[]>;

  private groupSubscription: Subscription;

  constructor(
    private deedService: DeedService,
    private state: StateService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (has(changes, 'includeIds') && !isEqual(changes.includeIds.currentValue, changes.includeIds.previousValue)) {
      this.loadDeeds();
    }
  }

  ngOnInit(): void {
    this.loadDeeds();

    this.groupSubscription = Observable.combineLatest(
      this.state.auth.group$,
      this.state.auth.campaign$,
    )
      .subscribe(([group, campaign]: [Group, Campaign]) => {
        const queryParams: SearchParams = {};
        if (campaign) {
          queryParams.campaign = campaign._id;
        } else if (group) {
          queryParams.group = group._id;
        }
        this.deedService.countAll(this.alwaysGlobal ? {} : queryParams);
      });
  }

  ngOnDestroy(): void {
    this.groupSubscription.unsubscribe();
  }

  private loadDeeds(): void {
    this.deeds$ = this.deedService.find()
      .map((deeds: Deed[]) => this.includeIds
        ? deeds.filter((deed: Deed) => this.includeIds.includes(deed._id))
        : deeds);
  }
}
