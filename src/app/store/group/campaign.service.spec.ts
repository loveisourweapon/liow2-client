import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import { assign } from 'lodash';

import { CampaignService } from './index';
import { HttpStubService } from '../../../testing';

describe(`CampaignService`, () => {
  let service: CampaignService;
  let http: JwtHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CampaignService,
        { provide: JwtHttp, useClass: HttpStubService },
      ],
    });
  });

  beforeEach(inject([CampaignService], (_service: CampaignService) => {
    service = _service;
    http = TestBed.get(JwtHttp);
  }));

  describe(`#save`, () => {
    const newCampaign = {
      group: 'abc123',
      deeds: [{ deed: 'def456' }],
    };

    it(`should POST to /campaigns if passed in campaign doesn't have an ID`, () => {
      const response = new Response(new ResponseOptions({ body: newCampaign }));
      const httpSpy = spyOn(http, 'post').and.returnValue(Observable.of(response));
      service.save(newCampaign).subscribe(() => {
        expect(httpSpy.calls.mostRecent().args[0]).toMatch(/\/campaigns/);
        expect(httpSpy.calls.mostRecent().args[1]).toBe(newCampaign);
      });
    });

    it(`should PUT to /campaigns/:campaignId if passed in campaign has an ID`, () => {
      const updatedCampaign = assign({}, newCampaign, { _id: 'ghi789' });
      const response = new Response(new ResponseOptions({ body: updatedCampaign }));
      const httpSpy = spyOn(http, 'put').and.returnValue(Observable.of(response));
      service.save(updatedCampaign).subscribe(() => {
        expect(httpSpy.calls.mostRecent().args[0]).toMatch(new RegExp(`/campaigns/${updatedCampaign._id}$`));
        expect(httpSpy.calls.mostRecent().args[1]).toBe(updatedCampaign);
      });
    });
  });
});
