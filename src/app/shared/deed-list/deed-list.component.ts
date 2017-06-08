import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { find, has, isEqual } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

import { Campaign, Deed, DeedPublish, Group } from '../../core/models';
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
  @Input() campaign: Campaign;
  @Input() isGlobal = false;

  deeds$: Observable<Deed[]>;

  private groupSubscription: Subscription;

  constructor(
    private deedService: DeedService,
    private state: StateService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (has(changes, 'campaign') && !isEqual(changes.campaign.currentValue, changes.campaign.previousValue)) {
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
        if (!this.isGlobal) {
          if (campaign) {
            queryParams.campaign = campaign._id;
          } else if (group) {
            queryParams.group = group._id;
          }
        }
        this.deedService.countAll(queryParams);
      });
  }

  ngOnDestroy(): void {
    this.groupSubscription.unsubscribe();
  }

  private loadDeeds(): void {
    this.deeds$ = this.deedService.find()
      .map((deeds: Deed[]) => this.campaign
        ? this.campaign.deeds.map((item: DeedPublish) => find(deeds, { _id: item.deed['_id'] }))
        : deeds);
  }
}
