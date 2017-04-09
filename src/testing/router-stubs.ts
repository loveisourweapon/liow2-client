/* tslint:disable:component-selector directive-selector no-input-rename */
import { Component, Directive, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStubService {
  params = new BehaviorSubject<any>({});
  queryParams = new BehaviorSubject<any>({});
  parent = <ActivatedRouteStubService>{
    params: new BehaviorSubject<any>({}),
    queryParams: new BehaviorSubject<any>({}),
  };
}

@Injectable()
export class RouterStubService {
  events = new BehaviorSubject<any>({});
  navigate() { }
}

@Component({
  selector: 'router-outlet',
  template: ``,
})
export class RouterOutletStubComponent {
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
}

@Directive({ selector: '[routerLink]' })
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
}

@Directive({
  selector: '[routerLinkActive]',
  exportAs: 'routerLinkActive',
})
export class RouterLinkActiveStubDirective {
  @Input() routerLinkActive: string;
  @Input() routerLinkActiveOptions: any;
}
