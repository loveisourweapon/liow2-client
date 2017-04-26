import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { Campaign, Deed, Group } from '../../core/models';
import { DeedService, StateService } from '../../core/services';
import { SearchParams } from '../../shared';

@Component({
  selector: 'liow-deed-list',
  templateUrl: './deed-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeedListComponent implements OnInit, OnDestroy {
  @Input() layout: string;
  @Input() alwaysGlobal = false;

  deeds$: Observable<Deed[]>;

  private groupSubscription: Subscription;

  constructor(
    private deedService: DeedService,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.deeds$ = this.deedService.find();

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
}
