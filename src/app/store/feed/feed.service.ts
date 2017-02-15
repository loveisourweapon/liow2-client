import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import * as seedrandom from 'seedrandom';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams } from '../utils';
import { FeedCriteria, FeedItem } from './index';

@Injectable()
export class FeedService {
  private baseUrl: string;
  private numberOfPictures = 12;

  constructor(
    private http: JwtHttp,
  ) {
    this.baseUrl = `${environment.apiBaseUrl}/feeds`;
  }

  load(criteria: FeedCriteria): Observable<FeedItem[]> {
    return this.http.get(this.baseUrl, { search: buildUrlSearchParams(criteria) })
      .map((response: Response) => response.json() || [])
      .map((feedItems: FeedItem[]) =>
        feedItems.map((feedItem: FeedItem) => {
          // Convert date strings to Date objects
          if (feedItem.created) { feedItem.created = new Date(feedItem.created); }

          // Set a random user picture seeded by the user ID
          if (!feedItem.user.picture) {
            const seed = seedrandom(feedItem.user._id);
            feedItem.user.picture = `/images/user${Math.floor(seed() * this.numberOfPictures)}.png`;
          }

          return feedItem;
        }));
  }
}
