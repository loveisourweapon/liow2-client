import { Injectable } from '@angular/core';

import { Campaign, Deed, EditAction, Group, User } from '../models';
import { StateService } from './state.service';

@Injectable()
export class ModalService {
  constructor(
    private state: StateService,
  ) { }

  openCampaignEdit(action = EditAction.Create, campaign?: Campaign): void {
    console.log('ModalService#openCampaignEdit', 'action', action, 'campaign', campaign);
    this.state.modal.campaignEdit$.next({
      isOpen: true,
      options: { action, campaign },
    });
  }

  openChangePassword(user: User): void {
    console.log('ModalService#openChangePassword', 'user', user);
    this.state.modal.changePassword$.next({
      isOpen: true,
      options: { user },
    });
  }

  openDeedPreview(deed: Deed): void {
    console.log('ModalService#openDeedPreview', 'deed', deed);
    this.state.modal.deedPreview$.next({
      isOpen: true,
      options: { deed },
    });
  }

  openForgotPassword(emailAddress = ''): void {
    console.log('ModalService#openForgotPassword', 'emailAddress', emailAddress);
    this.state.modal.forgotPassword$.next({
      isOpen: true,
      options: { emailAddress },
    });
  }

  openGroupEdit(action = EditAction.Create, group?: Group): void {
    console.log('ModalService#openGroupEdit', 'action', action, 'group', group);
    this.state.modal.groupEdit$.next({
      isOpen: true,
      options: { action, group },
    });
  }

  openGroupJoin(): void {
    console.log('ModalService#openGroupJoin');
    this.state.modal.groupJoin$.next({
      isOpen: true,
    });
  }

  openLogin(canSwitch = true): void {
    console.log('ModalService#openLogin', 'canSwitch', canSwitch);
    this.state.modal.login$.next({
      isOpen: true,
      options: { canSwitch },
    });
  }

  openSignup(canSwitch = true): void {
    console.log('ModalService#openSignup', 'canSwitch', canSwitch);
    this.state.modal.signup$.next({
      isOpen: true,
      options: { canSwitch },
    });
  }
}
