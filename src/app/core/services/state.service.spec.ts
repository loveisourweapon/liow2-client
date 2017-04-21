import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { Campaign, Counters, Deed, FeedItem, Group, ModalState, User } from '../models';
import { StateService } from './state.service';

describe(`StateService`, () => {
  let service: StateService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        providers: [
          StateService,
        ],
      });
  });

  beforeEach(inject([StateService], (_service: StateService) => {
    service = _service;
  }));

  describe(`auth`, () => {
    it(`should notify next isAuthenticated$ value when isAuthenticated value is set`, () => {
      service.auth.isAuthenticated$.first()
        .subscribe((isAuthenticated: boolean) => expect(isAuthenticated).toBe(false));
      service.auth.isAuthenticated = true;
      service.auth.isAuthenticated$.first()
        .subscribe((isAuthenticated: boolean) => expect(isAuthenticated).toBe(true));
    });

    it(`should notify next group$ value when group value is set`, () => {
      const testGroup = <Group>{};

      service.auth.group$.first()
        .subscribe((group: Group) => expect(group).toBeNull());
      service.auth.group = testGroup;
      service.auth.group$.first()
        .subscribe((group: Group) => expect(group).toBe(testGroup));
    });

    it(`should notify next user$ value when user value is set`, () => {
      const testUser = <User>{};

      service.auth.user$.first()
        .subscribe((user: User) => expect(user).toBeNull());
      service.auth.user = testUser;
      service.auth.user$.first()
        .subscribe((user: User) => expect(user).toBe(testUser));
    });
  });

  describe(`controlPanel`, () => {
    it(`should notify next deeds$ value when deeds value is set`, () => {
      const testDeeds = [<Deed>{ _id: 'abc123' }];

      service.controlPanel.deeds$.first()
        .subscribe((deeds: Deed[]) => expect(deeds).toEqual([]));
      service.controlPanel.deeds = testDeeds;
      service.controlPanel.deeds$.first()
        .subscribe((deeds: Deed[]) => expect(deeds).toBe(testDeeds));
    });

    it(`should notify next group$ value when group value is set`, () => {
      const testGroup = <Group>{ _id: 'abc123' };

      service.controlPanel.group$.first()
        .subscribe((group: Group) => expect(group).toBeNull());
      service.controlPanel.group = testGroup;
      service.controlPanel.group$.first()
        .subscribe((group: Group) => expect(group).toBe(testGroup));
    });

    it(`should notify next groups$ value when groups value is set`, () => {
      const testGroups = [<Group>{ _id: 'abc123' }];

      service.controlPanel.groups$.first()
        .subscribe((groups: Group[]) => expect(groups).toEqual([]));
      service.controlPanel.groups = testGroups;
      service.controlPanel.groups$.first()
        .subscribe((groups: Group[]) => expect(groups).toBe(testGroups));
    });

    it(`should notify next user$ value when user value is set`, () => {
      const testUser = <User>{ _id: 'abc123' };

      service.controlPanel.user$.first()
        .subscribe((user: User) => expect(user).toBeNull());
      service.controlPanel.user = testUser;
      service.controlPanel.user$.first()
        .subscribe((user: User) => expect(user).toBe(testUser));
    });

    it(`should notify next users$ value when users value is set`, () => {
      const testUsers = [<User>{ _id: 'abc123' }];

      service.controlPanel.users$.first()
        .subscribe((users: User[]) => expect(users).toEqual([]));
      service.controlPanel.users = testUsers;
      service.controlPanel.users$.first()
        .subscribe((users: User[]) => expect(users).toBe(testUsers));
    });
  });

  describe(`counters`, () => {
    const testCounterId = 'testCounter';
    const testCount = 123;

    describe(`#counter$`, () => {
      it(`should return an observable of a single counter`, () => {
        service.updateCounter(testCounterId, testCount);
        const counter$ = service.counter$(testCounterId);
        expect(counter$ instanceof Observable).toBe(true);
        counter$.first().subscribe((count: number) => expect(count).toBe(testCount));
      });

      it(`should return an observable that never produces a value if specified counter doesn't exist`, () => {
        const counter$ = service.counter$('noCounterHere');
        expect(counter$ instanceof Observable).toBe(true);
      });
    });

    describe(`#updateCounter`, () => {
      it(`should add a new counter`, () => {
        service.counters$.first()
          .subscribe((counters: Counters) => expect(counters[testCounterId]).toBeUndefined());
        service.updateCounter(testCounterId, testCount);
        service.counters$.first()
          .subscribe((counters: Counters) => expect(counters[testCounterId]).toBe(testCount));
      });

      it(`should update an existing counter`, () => {
        const updatedCount = 456;

        service.updateCounter(testCounterId, testCount);
        service.counters$.first()
          .subscribe((counters: Counters) => expect(counters[testCounterId]).toBe(testCount));
        service.updateCounter(testCounterId, updatedCount);
        service.counters$.first()
          .subscribe((counters: Counters) => expect(counters[testCounterId]).toBe(updatedCount));
      });
    });
  });

  describe(`deed`, () => {
    it(`should notify next deed$ value when deed value is set`, () => {
      const testDeed = <Deed>{};

      service.deed$.first()
        .subscribe((deed: Deed) => expect(deed).toBeNull());
      service.deed = testDeed;
      service.deed$.first()
        .subscribe((deed: Deed) => expect(deed).toBe(testDeed));
    });
  });

  describe(`feed`, () => {
    it(`should notify next items$ value when items value is set`, () => {
      const testFeedItems = [<FeedItem>{}];

      service.feed.items$.first()
        .subscribe((feedItems: FeedItem[]) => expect(feedItems).toEqual([]));
      service.feed.items = testFeedItems;
      service.feed.items$.first()
        .subscribe((feedItems: FeedItem[]) => expect(feedItems).toBe(testFeedItems));
    });

    // TODO: test #update method
  });

  describe(`group`, () => {
    it(`should notify next group$ value when group value is set`, () => {
      const testGroup = <Group>{};

      service.group$.first()
        .subscribe((group: Group) => expect(group).toBeNull());
      service.group = testGroup;
      service.group$.first()
        .subscribe((group: Group) => expect(group).toBe(testGroup));
    });

    it(`should notify next campaign$ value when campaign value is set`, () => {
      const testCampaign = <Campaign>{};

      service.campaign$.first()
        .subscribe((campaign: Campaign) => expect(campaign).toBeNull());
      service.campaign = testCampaign;
      service.campaign$.first()
        .subscribe((campaign: Campaign) => expect(campaign).toBe(testCampaign));
    });
  });

  describe(`layout`, () => {
    it(`should notify next isMenuOpen$ value when isMenuOpen value is set`, () => {
      service.layout.isMenuOpen$.first()
        .subscribe((isMenuOpen: boolean) => expect(isMenuOpen).toBe(false));
      service.layout.isMenuOpen = true;
      service.layout.isMenuOpen$.first()
        .subscribe((isMenuOpen: boolean) => expect(isMenuOpen).toBe(true));
    });

    it(`should notify next isSmallScreen$ value when isSmallScreen value is set`, () => {
      service.layout.isSmallScreen$.first()
        .subscribe((isSmallScreen: boolean) => expect(isSmallScreen).toBe(false));
      service.layout.isSmallScreen = true;
      service.layout.isSmallScreen$.first()
        .subscribe((isSmallScreen: boolean) => expect(isSmallScreen).toBe(true));
    });
  });

  describe(`modal`, () => {
    it(`should initialise campaignEdit$ isOpen property to false`, () => {
      service.modal.campaignEdit$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(false));
    });

    it(`should initialise changePassword$ isOpen property to false`, () => {
      service.modal.changePassword$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(false));
    });

    it(`should initialise deedPreview$ isOpen property to false`, () => {
      service.modal.deedPreview$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(false));
    });

    it(`should initialise forgotPassword$ isOpen property to false`, () => {
      service.modal.forgotPassword$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(false));
    });

    it(`should initialise groupEdit$ isOpen property to false`, () => {
      service.modal.groupEdit$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(false));
    });

    it(`should initialise login$ isOpen property to false`, () => {
      service.modal.login$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(false));
    });

    it(`should initialise signup$ isOpen property to false`, () => {
      service.modal.signup$.first()
        .subscribe((modalState: ModalState) => expect(modalState.isOpen).toBe(false));
    });
  });
});
