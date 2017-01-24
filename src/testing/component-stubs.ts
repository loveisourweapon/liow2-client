import { Component, Input } from '@angular/core';

@Component({
  selector: 'liow-deed-list',
  template: '',
})
export class DeedListStubComponent {
  @Input() layout: string;
}

@Component({
  selector: 'liow-deed-list-horizontal',
  template: '',
})
export class DeedListHorizontalStubComponent {
  @Input() deeds: any;
}

@Component({
  selector: 'liow-deed-list-vertical',
  template: '',
})
export class DeedListVerticalStubComponent {
  @Input() deeds: any;
}

@Component({
  selector: 'liow-jumbotron',
  template: '',
})
export class JumbtronStubComponent {
  @Input() image: string;
  @Input() background: string;
  @Input() classes: string;
}

@Component({
  selector: 'liow-navbar',
  template: '',
})
export class NavbarStubComponent { }

@Component({
  selector: 'liow-welcome',
  template: '',
})
export class WelcomeStubComponent { }
