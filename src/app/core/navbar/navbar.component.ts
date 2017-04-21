import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { identifyBy } from '../../shared';
import { ActService, AuthService, ModalService, StateService } from '../services';

@Component({
  selector: 'liow-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  identifyBy = identifyBy;

  constructor(
    private actService: ActService,
    public auth: AuthService,
    public modal: ModalService,
    public state: StateService,
  ) { }

  ngOnInit(): void {
    // Load initial global counter
    this.actService.count();
  }

  openMenu(): void {
    this.state.layout.isMenuOpen = true;
  }
}
