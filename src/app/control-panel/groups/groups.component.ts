import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { search } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TitleService } from '../../core';
import { identifyBy } from '../../shared';
import * as fromRoot from '../../store/reducer';
import * as groupsControlPanel from '../../store/control-panel/groups/groups.actions';
import * as fromGroupsControlPanel from '../../store/control-panel/groups/groups.reducer';
import { Group } from '../../store/group';

@Component({
  templateUrl: './groups.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit, OnDestroy {
  state$: Observable<fromGroupsControlPanel.State>;

  @ViewChild('welcomeMessageModal') welcomeMessageModal: ModalDirective;
  welcomeMessage: string;
  welcomeMessageTitle: string;

  identifyBy = identifyBy;

  private routerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.state$ = this.store.select(fromRoot.getGroupsControlPanel);
    this.title.set(`Groups | Control Panel`);

    this.routerSubscription = this.route.queryParams
      .distinctUntilChanged()
      .map((queryParams: Params) => queryParams.query || '')
      .subscribe((query: string) => {
        this.store.dispatch(new groupsControlPanel.UpdateQueryAction(query));
        this.store.dispatch(new groupsControlPanel.UpdatePageAction(1));
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  onSearch(query: string): void {
    this.store.dispatch(search({ query }));
  }

  onCurrentPageChanged(currentPage: number): void {
    this.store.dispatch(new groupsControlPanel.UpdatePageAction(currentPage));
  }

  onNumberOfPagesChanged(numberOfPages: number): void {
    this.store.dispatch(new groupsControlPanel.UpdateNumberOfPagesAction(numberOfPages));
  }

  openWelcomeMessage(group: Group): void {
    this.welcomeMessage = group.welcomeMessage;
    this.welcomeMessageTitle = `${group.name} Welcome Message`;
    this.welcomeMessageModal.show();
  }

  closeWelcomeMessage(): void {
    if (this.welcomeMessageModal.isShown) {
      this.welcomeMessageModal.hide();
    }
  }
}
