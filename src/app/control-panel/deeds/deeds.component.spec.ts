import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedsComponent } from './deeds.component';

describe(`DeedsComponent`, () => {
  let component: DeedsComponent;
  let fixture: ComponentFixture<DeedsComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          DeedsComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });
});
