import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import * as fromRoot from '../store/reducers';
import { JumbtronStubComponent, StoreStubService, YoutubePlayerStubComponent } from '../../testing';

describe(`HomeComponent`, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<fromRoot.State>;

  const testUser = { groups: [] };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          HomeComponent,
          JumbtronStubComponent,
          WelcomeStubComponent,
          HomeFeedStubComponent,
          YoutubePlayerStubComponent,
        ],
        providers: [
          { provide: Store, useClass: StoreStubService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(Observable.of(testUser));

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

@Component({
  selector: 'liow-home-feed',
  template: ``,
})
class HomeFeedStubComponent {
  @Input() authUser: any;
  @Input() counters: any;
}
