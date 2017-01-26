import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { JumbtronStubComponent } from '../../testing';

describe(`HomeComponent`, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          HomeComponent,
          JumbtronStubComponent,
          WelcomeStubComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'liow-welcome',
  template: ``,
})
class WelcomeStubComponent { }

// Required for AOT compiler
@NgModule({ declarations: [ WelcomeStubComponent ] })
class TestingModule { }
