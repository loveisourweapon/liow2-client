/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { assign, has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { Campaign, Comment, Counters, Deed, FeedItem, Group, ModalState, User } from '../models';

@Injectable()
export class StateService {
  auth = {
    isAuthenticated$: new BehaviorSubject<boolean>(false),
    set isAuthenticated(isAuthenticated: boolean) { this.isAuthenticated$.next(isAuthenticated); },

    group$: new BehaviorSubject<Group>(null),
    set group(group: Group) { this.group$.next(group); },
    campaign$: new BehaviorSubject<Campaign>(null),
    set campaign(campaign: Campaign) { this.campaign$.next(campaign); },

    user$: new BehaviorSubject<User>(null),
    set user(user: User) { this.user$.next(user); },
  };

  controlPanel = {
    comments$: new BehaviorSubject<Comment[]>([]),
    set comments(comments: Comment[]) { this.comments$.next(comments); },

    deeds$: new BehaviorSubject<Deed[]>([]),
    set deeds(deeds: Deed[]) { this.deeds$.next(deeds); },

    group$: new BehaviorSubject<Group>(null),
    set group(group: Group) { this.group$.next(group); },

    groups$: new BehaviorSubject<Group[]>([]),
    set groups(groups: Group[]) { this.groups$.next(groups); },

    user$: new BehaviorSubject<User>(null),
    set user(user: User) { this.user$.next(user); },

    users$: new BehaviorSubject<User[]>([]),
    set users(users: User[]) { this.users$.next(users); },
  };

  counters$ = new BehaviorSubject<Counters>({});
  counter$(counterId: string): Observable<number> {
    return this.counters$
      .filter((counters: Counters) => has(counters, counterId))
      .map((counters: Counters) => counters[counterId]);
  }
  updateCounter(counterId: string, count: number): void {
    this.counters$.first()
      .subscribe((counters: Counters) => {
        const updatedCounters = assign({}, counters, { [counterId]: count });
        this.counters$.next(updatedCounters);
      });
  }

  deed$ = new BehaviorSubject<Deed>(null);
  set deed(deed: Deed) { this.deed$.next(deed); }

  static readonly FEED_UPDATE_DELAY = 80;
  feed = {
    items$: new BehaviorSubject<FeedItem[]>([]),
    set items(feedItems: FeedItem[]) { this.items$.next(feedItems); },
    update$: new BehaviorSubject<boolean>(true),
    update(reload = false): void {
      setTimeout(() => this.update$.next(reload), StateService.FEED_UPDATE_DELAY);
    },
  };

  group$ = new BehaviorSubject<Group>(null);
  set group(group: Group) { this.group$.next(group); }
  campaign$ = new BehaviorSubject<Campaign>(null);
  set campaign(campaign: Campaign) { this.campaign$.next(campaign); }

  layout = {
    isMenuOpen$: new BehaviorSubject<boolean>(false),
    set isMenuOpen(isMenuOpen: boolean) { this.isMenuOpen$.next(isMenuOpen); },

    isSmallScreen$: new BehaviorSubject<boolean>(false),
    set isSmallScreen(isSmallScreen: boolean) { this.isSmallScreen$.next(isSmallScreen); },
  };

  modal = {
    campaignEdit$: new BehaviorSubject<ModalState>({ isOpen: false }),
    changePassword$: new BehaviorSubject<ModalState>({ isOpen: false }),
    deedPreview$: new BehaviorSubject<ModalState>({ isOpen: false }),
    forgotPassword$: new BehaviorSubject<ModalState>({ isOpen: false }),
    groupEdit$: new BehaviorSubject<ModalState>({ isOpen: false }),
    login$: new BehaviorSubject<ModalState>({ isOpen: false }),
    signup$: new BehaviorSubject<ModalState>({ isOpen: false }),
  };
}
