import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';

import { JumbotronComponent } from './jumbotron.component';

describe(`JumbotronComponent`, () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          JumbotronComponent,
          TestHost1Component,
          TestHost2Component,
        ],
      })
      .compileComponents();
  }));

  describe(`without [jumbotron-content]`, () => {
    let fixture: ComponentFixture<TestHost1Component>;
    let testHost: TestHost1Component;
    let element: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHost1Component);
      testHost = fixture.componentInstance;
      fixture.detectChanges();

      element = fixture.debugElement.query(By.css('.jumbotron'));
    });

    it(`should show .jumbotron-title and .jumbotron-text if [jumbotron-content] not included`, () => {
      const contentElement = element.query(By.css('[jumbotron-content]'));
      const titleElement = element.query(By.css('.jumbotron-title'));
      const textElement = element.query(By.css('.jumbotron-text'));

      expect(titleElement).toBeTruthy();
      expect(textElement).toBeTruthy();
      expect(contentElement).toBeNull();
    });

    it(`should set input background as 'background-image' style on the .jumbotron element`, () => {
      expect(element.styles['background-image']).toBe(`url(${testHost.background})`);
    });

    it(`should append all classes from input property to the .jumbotron element`, () => {
      const classList = element.nativeElement.classList;
      testHost.classes.forEach((className: string) => expect(classList.contains(className)).toBe(true));
    });
  });

  describe(`with [jumbotron-content]`, () => {
    let fixture: ComponentFixture<TestHost2Component>;
    let testHost: TestHost2Component;
    let element: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHost2Component);
      testHost = fixture.componentInstance;
      fixture.detectChanges();

      element = fixture.debugElement.query(By.css('.jumbotron'));
    });

    it(`should only show the contents of [jumbotron-content] if included`, () => {
      const contentElement = element.query(By.css('[jumbotron-content]'));
      const titleElement = element.query(By.css('.jumbotron-title'));
      const textElement = element.query(By.css('.jumbotron-text'));

      expect(contentElement).toBeTruthy();
      expect(titleElement).toBeNull();
      expect(textElement).toBeNull();
    });
  });
});

@Component({
  template: `
    <liow-jumbotron
      [background]="background"
      [classes]="classes"
    ></liow-jumbotron>
  `,
})
class TestHost1Component {
  background = '/test/image/url.png';
  classes = ['test', 'classes'];
}

@Component({
  template: `
    <liow-jumbotron>
      <div jumbotron-content>
        <p>Test content</p>
      </div>
    </liow-jumbotron>
  `,
})
class TestHost2Component { }

// Required for AOT compiler
@NgModule({
  declarations: [
    TestHost1Component,
    TestHost2Component,
  ],
})
class TestingModule { }
