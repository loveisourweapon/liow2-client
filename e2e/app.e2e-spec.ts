import { Liow2ClientPage } from './app.po';

describe('liow2-client App', function() {
  let page: Liow2ClientPage;

  beforeEach(() => {
    page = new Liow2ClientPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to liow!!'))
      .then(done, done.fail);
  });
});
