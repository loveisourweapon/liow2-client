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
 * Only things that read the live DOM see this, such as the AddToAny share buttons on the
 * deed and group pages. Crawlers don't run JavaScript, so shared links still preview with
 * the defaults from index.html until BK-16 renders these server-side.
 */
@Injectable()
export class MetaService {
  private readonly baseTitle = environment.appName;

  // Snapshotted from index.html rather than restated here, so each brand's wording lives
  // in one place
  private readonly defaultDescription: string;

  constructor(private meta: Meta, @Inject(DOCUMENT) private document: any) {
    const tag = this.meta.getTag('name="description"');
    this.defaultDescription = tag ? tag.content : '';
  }

  clear(): void {
    console.info('MetaService#clear');
    this.apply(this.baseTitle, this.defaultDescription);

    // index.html deliberately carries no og:url, so remove rather than reset it
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
