import { Injectable } from '@angular/core';

import { Campaign, Deed, EditAction, Group, User } from '../models';
import { StateService } from './state.service';

@Injectable()
export class ModalService {
  constructor(
    private state: StateService,
  ) { }

  openCampaignEdit(action = EditAction.Create, campaign?: Campaign): void {
    this.state.modal.campaignEdit$.next({
      isOpen: true,
      options: { action, campaign },
    });
  }

  openChangePassword(user: User): void {
    this.state.modal.changePassword$.next({
      isOpen: true,
      options: { user },
    });
  }

  openDeedPreview(deed: Deed): void {
    this.state.modal.deedPreview$.next({
      isOpen: true,
      options: { deed },
    });
  }

  openForgotPassword(emailAddress = ''): void {
    this.state.modal.forgotPassword$.next({
      isOpen: true,
      options: { emailAddress },
    });
  }

  openGroupEdit(action = EditAction.Create, group?: Group): void {
    this.state.modal.groupEdit$.next({
      isOpen: true,
      options: { action, group },
    });
  }

  openLogin(canSwitch = true): void {
    this.state.modal.login$.next({
      isOpen: true,
      options: { canSwitch },
    });
  }

  openSignup(canSwitch = true): void {
    this.state.modal.signup$.next({
      isOpen: true,
      options: { canSwitch },
    });
  }
}
