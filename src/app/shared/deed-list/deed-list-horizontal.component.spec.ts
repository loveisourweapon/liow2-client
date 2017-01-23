import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedListHorizontalComponent } from './deed-list-horizontal.component';
import { RouterLinkStubDirective } from '../../../testing';

describe('DeedListHorizontalComponent', () => {
  let component: DeedListHorizontalComponent;
  let fixture: ComponentFixture<DeedListHorizontalComponent>;

  // TODO: create better tests that actually test the deed output
  const deeds = [];

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedListHorizontalComponent,
          RouterLinkStubDirective,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedListHorizontalComponent);
    component = fixture.componentInstance;
    component.deeds = deeds;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
