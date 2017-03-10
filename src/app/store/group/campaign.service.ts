import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import { has } from 'lodash';

import { environment } from '../../../environments/environment';
import { Campaign, NewCampaign } from './index';

@Injectable()
export class CampaignService {
  private baseUrl: string;

  constructor(
    private http: JwtHttp,
  ) {
    this.baseUrl = `${environment.apiBaseUrl}/campaigns`;
  }

  save(campaign: Campaign|NewCampaign): Observable<Campaign> {
    const request = has(campaign, '_id')
      ? this.http.put(`${this.baseUrl}/${campaign['_id']}`, campaign)
      : this.http.post(this.baseUrl, campaign)
      ;

    return request
      .map((response: Response) => response.json() || {})
      .map((campaign: Campaign) => this.transformCampaign(campaign));
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
