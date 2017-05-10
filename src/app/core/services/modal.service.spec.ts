import { inject, TestBed } from '@angular/core/testing';
import 'rxjs/add/operator/first';

import { Campaign, Deed, EditAction, Group, ModalState, User } from '../models';
import { ModalService } from './modal.service';
import { StateService } from './state.service';

describe(`ModalService`, () => {
  let service: ModalService;
  let state: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalService,
        StateService
      ],
    });
  });

  beforeEach(inject([ModalService], (_service: ModalService) => {
    service = _service;
    state = TestBed.get(StateService);
  }));

  describe(`#openCampaignEdit`, () => {
    it(`should set modal isOpen property to true`, () => {
      service.openCampaignEdit();
      state.modal.campaignEdit$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(true));
    });

    it(`should set optional initial action and campaign properties`, () => {
      const action = EditAction.Update;
      const campaign = <Campaign>{ _id: 'def456' };
      service.openCampaignEdit(action, campaign);
      state.modal.campaignEdit$.first().subscribe((modalState: ModalState) => {
        expect(modalState.options.action).toBe(action);
        expect(modalState.options.campaign).toBe(campaign);
      });
    });
  });

  describe(`#openChangePassword`, () => {
    const user = <User>{ _id: 'abc123' };

    it(`should set modal isOpen property to true`, () => {
      service.openChangePassword(user);
      state.modal.changePassword$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(true));
    });

    it(`should set initial user property`, () => {
      service.openChangePassword(user);
      state.modal.changePassword$.first().subscribe((modalState: ModalState) => {
        expect(modalState.options.user).toBe(user);
      });
    });
  });

  describe(`#openDeedPreview`, () => {
    const deed = <Deed>{ _id: 'abc123' };

    it(`should set modal isOpen property to true`, () => {
      service.openDeedPreview(deed);
      state.modal.deedPreview$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(true));
    });

    it(`should set initial deed property`, () => {
      service.openDeedPreview(deed);
      state.modal.deedPreview$.first().subscribe((modalState: ModalState) => {
        expect(modalState.options.deed).toBe(deed);
      });
    });
  });

  describe(`#openForgotPassword`, () => {
    it(`should set modal isOpen property to true`, () => {
      service.openForgotPassword();
      state.modal.forgotPassword$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(true));
    });

    it(`should set optional initial emailAddress property`, () => {
      const emailAddress = 'test@example.com';
      service.openForgotPassword(emailAddress);
      state.modal.forgotPassword$.first()
        .subscribe((modalState: ModalState) => expect(modalState.options.emailAddress).toBe(emailAddress));
    });
  });

  describe(`#openGroupEdit`, () => {
    it(`should set modal isOpen property to true`, () => {
      service.openGroupEdit();
      state.modal.groupEdit$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(true));
    });

    it(`should set optional initial action and group properties`, () => {
      const action = EditAction.Update;
      const group = <Group>{ _id: 'abc123' };
      service.openGroupEdit(action, group);
      state.modal.groupEdit$.first().subscribe((modalState: ModalState) => {
        expect(modalState.options.action).toBe(action);
        expect(modalState.options.group).toBe(group);
      });
    });
  });

  describe(`#openGroupJoin`, () => {
    it(`should set modal isOpen property to true`, () => {
      service.openGroupJoin();
      state.modal.groupJoin$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(true));
    });
  });

  describe(`#openLogin`, () => {
    it(`should set modal isOpen property to true`, () => {
      service.openLogin();
      state.modal.login$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(true));
    });

    it(`should set optional initial canSwitch property`, () => {
      const canSwitch = false;
      service.openLogin(canSwitch);
      state.modal.login$.first()
        .subscribe((modalState: ModalState) => expect(modalState.options.canSwitch).toBe(canSwitch));
    });
  });

  describe(`#openSignup`, () => {
    it(`should set modal isOpen property to true`, () => {
      service.openSignup();
      state.modal.signup$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(true));
    });

    it(`should set optional initial canSwitch property`, () => {
      const canSwitch = false;
      service.openSignup(canSwitch);
      state.modal.signup$.first()
        .subscribe((modalState: ModalState) => expect(modalState.options.canSwitch).toBe(canSwitch));
    });
  });
});
