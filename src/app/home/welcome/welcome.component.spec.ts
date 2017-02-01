import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { WelcomeComponent } from './welcome.component';
import { DeedListStubComponent, StoreStubService } from '../../../testing';

describe(`WelcomeComponent`, () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          WelcomeComponent,
          DeedListStubComponent,
        ],
        providers: [
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
