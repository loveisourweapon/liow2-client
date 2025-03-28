import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';

import { ModalState } from '../../core/models';
import { AlertifyService, StateService } from '../../core/services';

interface SalvationForm {
  isFor: string;
  commitmentType: string;
  ageRange: string;
  churchConnection: string;
}

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
  formData: SalvationForm = {
    isFor: '',
    commitmentType: '',
    ageRange: '',
    churchConnection: '',
  };
  errorMessage = '';

  private stateSubscription: Subscription;

  constructor(private alertify: AlertifyService, private state: StateService) {}

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
    // TODO: Implement API call to POST /salvations
    // For now just close the modal
    this.onClose();
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
