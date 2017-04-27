import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

import { identifyBy } from '../../shared';
import { ActService, AuthService, ModalService, StateService } from '../services';

@Component({
  selector: 'liow-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  identifyBy = identifyBy;

  private readonly refreshTimer = 10000;
  private timerSubscription: Subscription;

  constructor(
    private actService: ActService,
    public auth: AuthService,
    public modal: ModalService,
    public state: StateService,
  ) { }

  ngOnInit(): void {
    // Load initial global counter and setup regular refresh
    this.timerSubscription = Observable.timer(0, this.refreshTimer)
      .subscribe(() => this.actService.count());
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  openMenu(): void {
    this.state.layout.isMenuOpen = true;
  }
}
