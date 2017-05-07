import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as seedrandom from 'seedrandom';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams } from '../../shared';
import { FeedCriteria, FeedItem } from '../models';

@Injectable()
export class FeedService {
  private readonly baseUrl = `${environment.apiBaseUrl}/feeds`;
  private readonly numberOfPictures = 12;

  constructor(
    private http: JwtHttp,
  ) { }

  load(criteria: FeedCriteria): Observable<FeedItem[]> {
    console.log('FeedService#load', 'criteria', criteria);
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
