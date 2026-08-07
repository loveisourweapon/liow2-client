import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, Meta } from '@angular/platform-browser';
import { environment } from 'environments/environment';

export interface PageMeta {
  title: string;
  description?: string;
}

/**
 * Keeps the share card meta tags in step with the current page.
 *
 * The share image is always the brand artwork from index.html. Deeds and groups do carry
 * image fields, but there's no upload support behind them, so per-page images aren't worth
 * chasing - see the note in GroupService#transformGroup.
 *
 * Note this is only ever seen by things that read the live DOM - the AddToAny share
 * buttons on the deed and group pages, for instance. Crawlers don't run JavaScript, so
 * they still see the defaults from index.html. Rendering per-page tags server-side is
 * BK-16.
 */
@Injectable()
export class MetaService {
  private readonly baseTitle = environment.appName;

  // The brand default lives in index.liow.html / index.bekind.html. Snapshotting it rather
  // than restating it here keeps one copy of the wording per brand.
  private readonly defaultDescription: string;

  constructor(private meta: Meta, @Inject(DOCUMENT) private document: any) {
    const tag = this.meta.getTag('name="description"');
    this.defaultDescription = tag ? tag.content : '';
  }

  clear(): void {
    console.info('MetaService#clear');
    this.apply(this.baseTitle, this.defaultDescription);

    // The defaults carry no og:url on purpose - see the comment in index.liow.html
    this.meta.removeTag('property="og:url"');
  }

  set(page: PageMeta): void {
    console.info('MetaService#set', 'page', page);
    this.apply(`${page.title} | ${this.baseTitle}`, page.description || this.defaultDescription);
    this.meta.updateTag({ property: 'og:url', content: this.document.location.href });
  }

  private apply(title: string, description: string): void {
    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });

    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }
}
