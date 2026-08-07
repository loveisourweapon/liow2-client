import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { environment } from 'environments/environment';

import { MetaService } from './meta.service';

describe(`MetaService`, () => {
  const defaultDescription = 'The brand default description';
  const managedSelectors = [
    'name="description"',
    'property="og:title"',
    'property="og:description"',
    'property="og:url"',
    'name="twitter:title"',
    'name="twitter:description"',
  ];

  let service: MetaService;
  let meta: Meta;

  const content = (selector: string): string => {
    const tag = meta.getTag(selector);

    return tag ? tag.content : null;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Meta, MetaService],
    });

    meta = TestBed.get(Meta);

    // The specs share one document, so stand the brand default up the way index.html
    // would before the service snapshots it
    meta.addTag({ name: 'description', content: defaultDescription });

    service = TestBed.get(MetaService);
  });

  afterEach(() => managedSelectors.forEach((selector) => meta.removeTag(selector)));

  describe(`#set`, () => {
    it(`should suffix the title with the app name`, () => {
      service.set({ title: 'Page Title' });

      expect(content('property="og:title"')).toBe(`Page Title | ${environment.appName}`);
      expect(content('name="twitter:title"')).toBe(`Page Title | ${environment.appName}`);
    });

    it(`should set the description on all three description tags`, () => {
      service.set({ title: 'Page Title', description: 'Page description' });

      expect(content('name="description"')).toBe('Page description');
      expect(content('property="og:description"')).toBe('Page description');
      expect(content('name="twitter:description"')).toBe('Page description');
    });

    it(`should fall back to the default description`, () => {
      service.set({ title: 'Page Title' });

      expect(content('property="og:description"')).toBe(defaultDescription);
    });

    it(`should set og:url to the current URL`, () => {
      service.set({ title: 'Page Title' });

      expect(content('property="og:url"')).toBe(location.href);
    });
  });

  describe(`#clear`, () => {
    it(`should restore the defaults`, () => {
      service.set({ title: 'Page Title', description: 'Page description' });
      service.clear();

      expect(content('property="og:title"')).toBe(environment.appName);
      expect(content('property="og:description"')).toBe(defaultDescription);
      expect(content('name="description"')).toBe(defaultDescription);
    });

    it(`should remove og:url, which the defaults deliberately omit`, () => {
      service.set({ title: 'Page Title' });
      service.clear();

      expect(meta.getTag('property="og:url"')).toBeNull();
    });
  });
});
