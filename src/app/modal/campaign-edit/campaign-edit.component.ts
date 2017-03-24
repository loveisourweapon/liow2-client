import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { DragulaService } from 'ng2-dragula';
import { cloneDeep, each, has } from 'lodash';

import { State as CampaignEditModalState } from '../../store/campaign-edit-modal';
import * as campaignEditModal from '../../store/campaign-edit-modal/campaign-edit-modal.actions';
import { Deed } from '../../store/deed';
import { Campaign, DeedPublish, NewCampaign } from '../../store/group';
import * as group from '../../store/group/group.actions';
import * as modal from '../../store/modal.actions';
import { State as AppState } from '../../store/reducer';

@Component({
  selector: 'liow-campaign-edit-modal',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignEditModalComponent implements OnChanges, OnInit {
  @Input() state = <CampaignEditModalState>null;
  @ViewChild('modal') modal: ModalDirective;

  // Need to create local mutable lists for Dragula to work
  // Listen to Dragula events to sync changes to global state
  availableDeeds: DeedPublish[];
  selectedDeeds: DeedPublish[];
  submitted: boolean;

  constructor(
    private dragula: DragulaService,
    private store: Store<AppState>,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (has(changes, 'state.currentValue')) {
      if (this.state.isOpen && !this.modal.isShown) {
        this.submitted = false;
        this.modal.show();
      } else if (!this.state.isOpen && this.modal.isShown) {
        this.modal.hide();
      }

      this.availableDeeds = [...this.state.deeds];
      this.selectedDeeds = <DeedPublish[]>[...this.state.campaign.deeds];
    }
  }

  ngOnInit(): void {
    this.dragula.dropModel.subscribe(() => {
      this.store.dispatch(new campaignEditModal.UpdateDeedsAction(this.availableDeeds));
      this.store.dispatch(new campaignEditModal.UpdateSelectedDeedsAction(this.selectedDeeds));
    });
  }

  save(campaign: Campaign|NewCampaign): void {
    this.submitted = true;
    if (campaign.deeds.length === 0) { return; }

    const campaignToSave = cloneDeep(campaign);
    each(campaignToSave.deeds, (item: DeedPublish) => item.deed = item.deed['_id']);
    this.store.dispatch(new group.CreateCampaignAction(campaignToSave));
  }

  openDeedPreview(deed: Deed): void {
    this.store.dispatch(new modal.OpenDeedPreviewAction(deed));
  }

  onClose(): void {
    this.store.dispatch(new campaignEditModal.CloseAction());
  }

  identifyItem(idx: number, item: DeedPublish): string {
    const deed = <Deed>item.deed;
    return deed._id;
  }
}
