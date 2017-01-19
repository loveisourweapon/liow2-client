import { Component } from '@angular/core';

@Component({
  selector: 'liow-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isCollapsed = true;

  setCollapsed(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }
}
