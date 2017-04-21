import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import { has } from 'lodash';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams, SearchParams } from '../../shared';
import { Campaign, NewCampaign, JsonPatch } from '../models';

@Injectable()
export class CampaignService {
  private readonly baseUrl = `${environment.apiBaseUrl}/campaigns`;

  constructor(
    private http: JwtHttp,
  ) { }

  find(params: SearchParams = {}): Observable<Campaign[]> {
    return this.http.get(this.baseUrl, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json() || [])
      .map((campaigns: Campaign[]) =>
        campaigns.map((campaign: Campaign) => this.transformCampaign(campaign)));
  }

  findOne(params: SearchParams = {}): Observable<Campaign> {
    return this.find(params)
      .map((campaigns: Campaign[]) => {
        if (campaigns.length !== 1) {
          throw new Error(`Campaign not found`);
        }

        return campaigns[0];
      });
  }

  save(campaign: Campaign|NewCampaign): Observable<Campaign> {
    const request = has(campaign, '_id')
      ? this.http.put(`${this.baseUrl}/${campaign._id}`, campaign)
      : this.http.post(this.baseUrl, campaign)
      ;

    return request
      .map((response: Response) => response.json() || {})
      .map((savedCampaign: Campaign) => this.transformCampaign(savedCampaign));
  }

  update(campaign: Campaign, changes: JsonPatch[]): Observable<null> {
    return this.http.patch(`${this.baseUrl}/${campaign._id}`, changes);
  }

  private transformCampaign(campaign: Campaign): Campaign {
    // Convert all date strings to Date objects
    if (campaign.dateStart) { campaign.dateStart = new Date(campaign.dateStart); }
    if (campaign.dateEnd) { campaign.dateEnd = new Date(campaign.dateEnd); }
    if (campaign.created) { campaign.created = new Date(campaign.created); }
    if (campaign.modified) { campaign.modified = new Date(campaign.modified); }

    return campaign;
  }
}
