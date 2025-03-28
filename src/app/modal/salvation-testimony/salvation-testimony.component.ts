import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/from';

import { ModalState, NewSalvationTestimony } from '../../core/models';
import { ActService, AlertifyService, StateService } from '../../core/services';

@Component({
  selector: 'liow-salvation-testimony-modal',
  templateUrl: './salvation-testimony.component.html',
  styleUrls: ['./salvation-testimony.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalvationTestimonyModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('form') form: NgForm;

  isSubmitting$ = new BehaviorSubject<boolean>(false);
  formData: NewSalvationTestimony = {
    isFor: '',
    commitmentType: '',
    ageRange: '',
    churchConnection: '',
  };
  errorMessage = '';

  private stateSubscription: Subscription;

  constructor(
    private actService: ActService,
    private alertify: AlertifyService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.stateSubscription = this.state.modal.salvationTestimony$.subscribe(
      (modalState: ModalState) => {
        if (modalState.isOpen && !this.modal.isShown) {
          this.modal.show();
        } else if (!modalState.isOpen && this.modal.isShown) {
          this.modal.hide();
        }
      }
    );
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

    this.isSubmitting$.next(true);
    Observable.from(this.state.auth.group$)
      .first()
      .switchMap((group) => this.actService.sendSalvationTestimony(this.formData, group))
      .finally(() => this.isSubmitting$.next(false))
      .subscribe(
        () => {
          this.alertify.success('Salvation testimony submitted successfully');
          this.onClose();
        },
        (error) => {
          this.errorMessage = error.message || 'Failed to submit salvation testimony';
          this.alertify.error(this.errorMessage);
        }
      );
  }

  onClose(): void {
    this.state.modal.salvationTestimony$.next({ isOpen: false });
    this.reset();
  }

  private reset(): void {
    this.isSubmitting$.next(false);
    this.formData = {
      isFor: '',
      commitmentType: '',
      ageRange: '',
      churchConnection: '',
    };
    this.errorMessage = '';
    this.form.resetForm();
  }
}
