import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterOutletStubComponent } from '../testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
          NavbarStubComponent,
          RouterOutletStubComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should render the current year in the footer copyright`, () => {
    const date = component.date;
    const element = fixture.debugElement.query(By.css('footer > .container > div:first-child'));

    expect(element.nativeElement.textContent.trim()).toContain(date.getFullYear().toString());
  });
});

@Component({
  selector: 'liow-navbar',
  template: '',
})
class NavbarStubComponent { }

// Required for AOT compiler
@NgModule({ declarations: [ NavbarStubComponent ] })
class TestingModule { }
