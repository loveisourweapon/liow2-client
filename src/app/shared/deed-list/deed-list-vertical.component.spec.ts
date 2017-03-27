import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterLinkStubDirective } from '../../../testing';
import { DeedListVerticalComponent } from './deed-list-vertical.component';

describe(`DeedListVerticalComponent`, () => {
  let component: DeedListVerticalComponent;
  let fixture: ComponentFixture<DeedListVerticalComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedListVerticalComponent,
          RouterLinkStubDirective,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedListVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
