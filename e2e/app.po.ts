import { browser, element, by } from 'protractor';

export class Liow2ClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('liow-root h1')).getText();
  }
}
