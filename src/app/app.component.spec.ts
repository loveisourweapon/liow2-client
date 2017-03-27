import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { RouterStubService, RouterOutletStubComponent, StoreStubService } from '../testing';
import { AppComponent } from './app.component';

describe(`AppComponent`, () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
          ModalsStubComponent,
          NavbarStubComponent,
          SidebarStubComponent,
          RouterOutletStubComponent,
        ],
        providers: [
          { provide: Router, useClass: RouterStubService },
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: test setting isSmallScreen and listening for resize events

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
  selector: 'liow-modals',
  template: ``,
})
class ModalsStubComponent { }

@Component({
  selector: 'liow-navbar',
  template: ``,
})
class NavbarStubComponent { }

@Component({
  selector: 'liow-sidebar',
  template: ``,
})
class SidebarStubComponent { }
