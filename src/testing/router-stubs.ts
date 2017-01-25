import { Component, Directive, Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'router-outlet',
  template: '',
})
export class RouterOutletStubComponent { }

@Directive({ selector: '[routerLink]' })
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
}

@Injectable()
export class ActivatedRouteStubService {
  params = new BehaviorSubject<any>({});
}

@Injectable()
export class RouterStubService {
  events = new BehaviorSubject<any>({});
}
