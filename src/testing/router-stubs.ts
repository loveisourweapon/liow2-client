import { Component, Directive, Input } from '@angular/core';

@Component({
  selector: 'router-outlet',
  template: '',
})
export class RouterOutletStubComponent { }

@Directive({ selector: '[routerLink]' })
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
}
