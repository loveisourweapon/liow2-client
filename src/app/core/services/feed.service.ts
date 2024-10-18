import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams, getUserImageUrl } from '../../shared';
import { FeedCriteria, FeedItem } from '../models';

@Injectable()
export class FeedService {
  private readonly baseUrl = `${environment.apiBaseUrl}/feeds`;

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

          feedItem.user.picture = getUserImageUrl(feedItem.user._id);

          return feedItem;
        }));
  }
}
