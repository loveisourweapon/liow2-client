import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { assign, has } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {
  ApiError,
  Campaign,
  Deed,
  DeedPublish,
  EditAction,
  Group,
  ModalState,
  NewCampaign,
} from '../../core/models';
import {
  AlertifyService,
  CampaignService,
  DeedService,
  ModalService,
  StateService,
} from '../../core/services';
import { identifyBy } from '../../shared';

@Component({
  selector: 'liow-campaign-edit-modal',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CampaignEditModalComponent implements OnInit, OnDestroy {
  @Input() group: Group;
  @ViewChild('modal') modal: ModalDirective;

  action: EditAction = EditAction.Create;
  isSaving$ = new BehaviorSubject<boolean>(false);
  campaign: Campaign;
  campaignDeeds$ = new BehaviorSubject<DeedPublish[]>([]);
  deeds$ = new BehaviorSubject<DeedPublish[]>([]);
  errorMessage = '';
  submitted = false;

  // Need to create local mutable lists for Dragula to work
  // Listen to Dragula events to sync changes to global state
  // TODO: investigate a better way to do this
  availableDeeds: DeedPublish[] = [];
  selectedDeeds: DeedPublish[] = [];

  identifyBy = identifyBy;

  private stateSubscription: Subscription;

  constructor(
    private alertify: AlertifyService,
    private campaignService: CampaignService,
    private deedService: DeedService,
    private dragula: DragulaService,
    public modalService: ModalService,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.dragula.dropModel.subscribe(() => {
      this.deeds$.next(this.availableDeeds);
      this.campaignDeeds$.next(this.selectedDeeds);
    });

    this.stateSubscription = this.state.modal.campaignEdit$
      .subscribe((state: ModalState) => {
        if (state.isOpen && !this.modal.isShown) {
          this.reset();
          this.initDeeds();
          this.modal.show();
        } else if (!state.isOpen && this.modal.isShown) {
          this.modal.hide();
        }

        const options = <CampaignEditModalOptions>state.options;
        this.action = has(options, 'action') ? options.action : EditAction.Create;
        this.campaign = has(options, 'campaign') ? options.campaign : null;

        const campaignDeeds = (this.campaign) ? options.campaign.deeds : [];
        this.campaignDeeds$.next(campaignDeeds);
        this.selectedDeeds = <DeedPublish[]>[...campaignDeeds];
      });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  save(campaign: Campaign, campaignDeeds$: Observable<DeedPublish[]>, group: Group): void {
    this.submitted = true;
    this.errorMessage = '';

    campaignDeeds$
      .first()
      .filter((deeds: DeedPublish[]) => deeds.length > 0)
      .do(() => this.isSaving$.next(true))
      .map((deeds: DeedPublish[]) => deeds.map((item: DeedPublish) => assign({}, item, { deed: item.deed['_id'] })))
      .switchMap((deeds: DeedPublish[]) => {
        const campaignToSave: Campaign|NewCampaign = campaign || <NewCampaign>{ group: group._id };
        campaignToSave.deeds = deeds;
        return this.campaignService.save(campaignToSave);
      })
      .finally(() => this.isSaving$.next(false))
      .switchMap(() => this.campaignService.findOne({ group: group._id, active: true }))
      .subscribe(
        (savedCampaign: Campaign) => {
          this.state.campaign = savedCampaign;
          this.state.auth.campaign = savedCampaign;

          this.alertify.success(`${this.action}d campaign`);
          this.onClose();
        },
        (error: ApiError) => this.errorMessage = error.message,
      );
  }

  onClose(): void {
    this.state.modal.campaignEdit$.next({ isOpen: false });
  }

  private initDeeds(): void {
    this.deedService.find()
      .map((deeds: Deed[]) => deeds.map((deed: Deed) => <DeedPublish>{ deed }))
      .subscribe((deeds: DeedPublish[]) => {
        const selectedDeedIds = this.selectedDeeds.map((item: DeedPublish) => item.deed['_id']);
        const remainingDeeds = deeds.filter((item: DeedPublish) => selectedDeedIds.indexOf(item.deed['_id']) === -1);

        this.deeds$.next(remainingDeeds);
        this.availableDeeds = [...remainingDeeds];
      });
  }

  private reset(): void {
    this.action = EditAction.Create;
    this.isSaving$.next(false);
    this.campaign = undefined;
    this.campaignDeeds$.next([]);
    this.deeds$.next([]);
    this.errorMessage = '';
    this.submitted = false;
  }
}

interface CampaignEditModalOptions {
  action: EditAction;
  campaign?: Campaign;
}
