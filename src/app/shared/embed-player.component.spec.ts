import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { EmbedPlayerComponent } from './embed-player.component';

describe(`EmbedPlayerComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedPlayerComponent, TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('iframe'));
  });

  it(`should set the iframe src URL to 'about:blank' if no videoId or videoUrl provided`, () => {
    fixture.detectChanges();
    expect(element.nativeElement.getAttribute('src')).toBe('about:blank');
  });

  it(`should set the iframe src URL to the provided videoUrl`, () => {
    testHost.videoUrl = 'https://video.example.com/videoId';
    fixture.detectChanges();
    expect(element.nativeElement.getAttribute('src')).toBe(testHost.videoUrl);
  });

  it(`should generate a YouTube embed URL with the provided videoId for the iframe src`, () => {
    testHost.videoId = 'abc123';
    fixture.detectChanges();
    expect(element.nativeElement.getAttribute('src')).toBe(
      `https://www.youtube.com/embed/${testHost.videoId}`
    );
  });
});

@Component({
  template: ` <ui-embed-player [videoId]="videoId" [videoUrl]="videoUrl"></ui-embed-player> `,
})
class TestHostComponent {
  videoId: string;
  videoUrl: string;
}
