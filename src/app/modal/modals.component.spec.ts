import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreStubService } from '../../testing';
import { ModalsComponent } from './modals.component';

// TODO: Add proper tests!
// Simple store spies won't work here because this component uses multiple `store.select` calls
// need more complicated spies or testing methods

xdescribe(`ModalsComponent`, () => {
  let component: ModalsComponent;
  let fixture: ComponentFixture<ModalsComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          ModalsComponent,
          LoginModalStubComponent,
          SignupModalStubComponent,
        ],
        providers: [
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'liow-login-modal',
  template: ``,
})
class LoginModalStubComponent {
  @Input() state: any;
  @Input() group: any;
}

@Component({
  selector: 'liow-signup-modal',
  template: ``,
})
class SignupModalStubComponent {
  @Input() state: any;
  @Input() group: any;
}
