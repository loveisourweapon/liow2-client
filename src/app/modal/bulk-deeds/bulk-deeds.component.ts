import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { find } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { Campaign, Deed, DeedPublish, Group, ModalState } from '../../core/models';
import { ActService, AlertifyService, DeedService, StateService } from '../../core/services';

interface BulkDeedsFormData {
  deed: string;
  count: number;
}

interface BulkDeedsModalOptions {
  campaign: Campaign;
  group: Group;
}

@Component({
  selector: 'liow-bulk-deeds-modal',
  templateUrl: './bulk-deeds.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BulkDeedsModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('form') form: NgForm;

  isSubmitting$ = new BehaviorSubject<boolean>(false);
  formData: BulkDeedsFormData = {
    deed: '',
    count: null,
  };
  errorMessage = '';
  campaign: Campaign;
  group: Group;
  deeds: Deed[] = [];

  private stateSubscription: Subscription;

  constructor(
    private actService: ActService,
    private alertify: AlertifyService,
    private deedService: DeedService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.stateSubscription = this.state.modal.bulkDeeds$.subscribe((modalState: ModalState) => {
      if (modalState.isOpen && !this.modal.isShown) {
        const options = <BulkDeedsModalOptions>modalState.options;
        this.campaign = options.campaign;
        this.group = options.group;
        this.loadDeeds();
        this.modal.show();
      } else if (!modalState.isOpen && this.modal.isShown) {
        this.modal.hide();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    const selectedDeed = find(this.deeds, { _id: this.formData.deed });
    if (!selectedDeed) {
      this.errorMessage = 'Please select a deed';
      return;
    }

    const count = parseInt(String(this.formData.count), 10);
    if (isNaN(count) || count <= 0) {
      this.errorMessage = 'Please enter a valid number greater than 0';
      return;
    }

    this.errorMessage = '';
    this.isSubmitting$.next(true);

    this.actService
      .bulkDeeds(selectedDeed, this.group, count)
      .finally(() => this.isSubmitting$.next(false))
      .subscribe(
        () => {
          this.alertify.success(
            `Successfully registered ${count} deed${count !== 1 ? 's' : ''} done`
          );
          // Refresh counters
          this.actService.count({ group: this.group._id });
          if (this.campaign) {
            this.actService.count({ campaign: this.campaign._id });
          }
          // Refresh individual deed counters for the sidebar
          if (this.campaign) {
            this.deedService.countAll({ campaign: this.campaign._id });
          } else {
            this.deedService.countAll({ group: this.group._id });
          }
          this.onClose();
        },
        (error) => {
          this.errorMessage = error.message || 'Failed to register bulk deeds';
          this.alertify.error(this.errorMessage);
        }
      );
  }

  onClose(): void {
    this.state.modal.bulkDeeds$.next({ isOpen: false });
    this.reset();
  }

  private loadDeeds(): void {
    if (!this.campaign || !this.campaign.deeds) {
      this.deeds = [];
      return;
    }

    // Extract deeds from campaign.deeds array
    this.deeds = this.campaign.deeds
      .map((item: DeedPublish) => {
        // Handle both Deed objects and DeedId strings
        if (typeof item.deed === 'object' && item.deed !== null) {
          return item.deed;
        }
        return null;
      })
      .filter((deed: Deed) => deed !== null);
  }

  private reset(): void {
    this.isSubmitting$.next(false);
    this.formData = {
      deed: '',
      count: null,
    };
    this.errorMessage = '';
    this.campaign = null;
    this.group = null;
    this.deeds = [];
    if (this.form) {
      this.form.resetForm();
    }
  }
}
