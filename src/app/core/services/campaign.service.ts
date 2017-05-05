import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../../environments/environment';
import { buildUrlSearchParams, SearchParams } from '../../shared';
import { Campaign, Group, NewCampaign, JsonPatch } from '../models';
import { StateService } from './state.service';

@Injectable()
export class CampaignService {
  private readonly baseUrl = `${environment.apiBaseUrl}/campaigns`;

  constructor(
    private http: JwtHttp,
    private state: StateService,
  ) {
    // Setup group$ and auth.group$ subscribers to set respective campaign$'s
    this.getCampaignForGroup(this.state.group$)
      .subscribe((campaign: Campaign) => this.state.campaign = campaign);
    this.getCampaignForGroup(this.state.auth.group$)
      .subscribe((campaign: Campaign) => this.state.auth.campaign = campaign);
  }

  find(params: SearchParams = {}): Observable<Campaign[]> {
    return this.http.get(this.baseUrl, { search: buildUrlSearchParams(params) })
      .map((response: Response) => response.json() || [])
      .map((campaigns: Campaign[]) =>
        campaigns.map((campaign: Campaign) => this.transformCampaign(campaign)));
  }

  findOne(params: SearchParams = {}): Observable<Campaign> {
    // It's possible some groups created multiple campaigns by accident
    // Get just the most recent campaign
    params.sort = '-_id';
    return this.find(params)
      .map((campaigns: Campaign[]) => {
        if (campaigns.length === 0) {
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
      .catch((response: Response) => Observable.throw(response.json().error))
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

  private getCampaignForGroup(group$: Observable<Group>): Observable<Campaign> {
    return group$
      .switchMap((group: Group) => {
        if (!group) { return Observable.of(null); }
        return this.findOne({ group: group._id, active: true });
      })
      .catch(() => Observable.of(null));
  }
}
