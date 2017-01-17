import { Liow2Ng2Page } from './app.po';

describe('liow2-ng2 App', function() {
  let page: Liow2Ng2Page;

  beforeEach(() => {
    page = new Liow2Ng2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('liow works!');
  });
});
