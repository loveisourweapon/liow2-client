import { Injectable } from '@angular/core';

import { Campaign, Deed, EditAction, Group, User } from '../models';
import { StateService } from './state.service';

@Injectable()
export class ModalService {
  constructor(private state: StateService) {}

  openBulkDeeds(group: Group, campaign: Campaign): void {
    console.info('ModalService#openBulkDeeds', 'group', group, 'campaign', campaign);
    this.state.modal.bulkDeeds$.next({
      isOpen: true,
      options: { group, campaign },
    });
  }

  openCampaignEdit(action = EditAction.Create, campaign?: Campaign): void {
    console.info('ModalService#openCampaignEdit', 'action', action, 'campaign', campaign);
    this.state.modal.campaignEdit$.next({
      isOpen: true,
      options: { action, campaign },
    });
  }

  openChangePassword(user: User): void {
    console.info('ModalService#openChangePassword', 'user', user);
    this.state.modal.changePassword$.next({
      isOpen: true,
      options: { user },
    });
  }

  openDeedPreview(deed: Deed): void {
    console.info('ModalService#openDeedPreview', 'deed', deed);
    this.state.modal.deedPreview$.next({
      isOpen: true,
      options: { deed },
    });
  }

  openForgotPassword(emailAddress = ''): void {
    console.info('ModalService#openForgotPassword', 'emailAddress', emailAddress);
    this.state.modal.forgotPassword$.next({
      isOpen: true,
      options: { emailAddress },
    });
  }

  openGroupEdit(action = EditAction.Create, group?: Group): void {
    console.info('ModalService#openGroupEdit', 'action', action, 'group', group);
    this.state.modal.groupEdit$.next({
      isOpen: true,
      options: { action, group },
    });
  }

  openGroupJoin(): void {
    console.info('ModalService#openGroupJoin');
    this.state.modal.groupJoin$.next({
      isOpen: true,
    });
  }

  openLogin(canSwitch = true): void {
    console.info('ModalService#openLogin', 'canSwitch', canSwitch);
    this.state.modal.login$.next({
      isOpen: true,
      options: { canSwitch },
    });
  }

  openSalvationTestimony(deed?: Deed): void {
    console.info('ModalService#openSalvationTestimony', 'deed', deed);
    this.state.modal.salvationTestimony$.next({
      isOpen: true,
      deed,
    });
  }

  openSignup(canSwitch = true): void {
    console.info('ModalService#openSignup', 'canSwitch', canSwitch);
    this.state.modal.signup$.next({
      isOpen: true,
      options: { canSwitch },
    });
  }
}
