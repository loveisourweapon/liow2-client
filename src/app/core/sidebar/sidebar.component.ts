import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { identifyBy } from '../../shared';
import { Group } from '../models';
import { AuthService, ModalService, StateService } from '../services';

@Component({
  selector: 'liow-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  identifyBy = identifyBy;

  private bodySubscription: Subscription;

  constructor(public auth: AuthService, public modal: ModalService, public state: StateService) {}

  ngOnInit(): void {
    // Add/remove the .modal-open class to the document body to prevent scrolling
    const bodyElement = document.querySelector('body');
    this.bodySubscription = Observable.combineLatest(
      this.state.layout.isSmallScreen$,
      this.state.layout.isMenuOpen$
    )
      .map(([isSmallScreen, isMenuOpen]: [boolean, boolean]) => isSmallScreen && isMenuOpen)
      .distinctUntilChanged()
      .subscribe((isShowing) => bodyElement.classList[isShowing ? 'add' : 'remove']('modal-open'));
  }

  ngOnDestroy(): void {
    this.bodySubscription.unsubscribe();
  }

  closeMenu(): void {
    this.state.layout.isMenuOpen = false;
  }

  getNonArchivedGroups(groups: Group[]): Group[] {
    return groups ? groups.filter((group) => !group.archived) : [];
  }
}
