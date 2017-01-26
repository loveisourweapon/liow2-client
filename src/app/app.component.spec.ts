import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { RouterStubService, RouterOutletStubComponent } from '../testing';

describe(`AppComponent`, () => {
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
        providers: [
          { provide: Router, useClass: RouterStubService },
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

  it(`should call window.scrollTo after NavigationEnd event`, () => {
    const windowSpy = spyOn(window, 'scrollTo');
    const router = TestBed.get(Router);
    router.events.next(new NavigationEnd(1, '/', '/'));

    expect(windowSpy).toHaveBeenCalledWith(0, 0);
  });
});

@Component({
  selector: 'liow-navbar',
  template: ``,
})
class NavbarStubComponent { }

// Required for AOT compiler
@NgModule({ declarations: [ NavbarStubComponent ] })
class TestingModule { }
