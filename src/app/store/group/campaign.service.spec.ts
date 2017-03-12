import { inject, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { JwtHttp } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Observable';
import { assign } from 'lodash';

import { Campaign, CampaignService } from './index';
import { HttpStubService } from '../../../testing';

describe(`CampaignService`, () => {
  let service: CampaignService;
  let http: JwtHttp;

  const testCampaign = {
    dateStart: new Date().toDateString(),
    dateEnd: new Date().toDateString(),
    created: new Date().toDateString(),
    modified: new Date().toDateString(),
  };

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

  describe(`#find`, () => {
    it(`should pass search params to http.get`, () => {
      const response = new Response(new ResponseOptions({ body: [testCampaign] }));
      const httpSpy = spyOn(http, 'get').and.returnValue(Observable.of(response));
      const params = { property: 'value' };
      service.find(params).subscribe(() => {
        const requestOptions = httpSpy.calls.mostRecent().args[1];
        expect(requestOptions.search.get('property')).toBe(params.property);
      });
    });

    it(`should convert Campaign date strings to Date objects`, () => {
      const response = new Response(new ResponseOptions({ body: [testCampaign] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.find().subscribe((campaigns: Campaign[]) => {
        expect(campaigns[0].dateStart instanceof Date).toBe(true);
        expect(campaigns[0].dateEnd instanceof Date).toBe(true);
        expect(campaigns[0].created instanceof Date).toBe(true);
        expect(campaigns[0].modified instanceof Date).toBe(true);
      });
    });
  });

  describe(`#findOne`, () => {
    it(`should return a single Campaign`, () => {
      const response = new Response(new ResponseOptions({ body: [testCampaign] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.findOne().subscribe((campaign: Campaign) => expect(campaign).toBe(testCampaign));
    });

    it(`should throw an error if no Campaigns found`, () => {
      const response = new Response(new ResponseOptions({ body: [] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.findOne().subscribe(() => {}, (error) => expect(error.message).toBe(`Campaign not found`));
    });

    it(`should throw an error if more than one Campaign found`, () => {
      const response = new Response(new ResponseOptions({ body: [testCampaign, testCampaign] }));
      spyOn(http, 'get').and.returnValue(Observable.of(response));
      service.findOne().subscribe(() => {}, (error) => expect(error.message).toBe(`Campaign not found`));
    });
  });

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

  describe(`#update`, () => {
    it(`should PATCH to /campaigns/:campaignId passing changes through`, () => {
      const testCampaign = <Campaign>{ _id: 'abc123' };
      const changes = [];
      const response = new Response(new ResponseOptions({ body: {} }));
      const httpSpy = spyOn(http, 'patch').and.returnValue(Observable.of(response));
      service.update(testCampaign, changes).subscribe(() => {
        expect(httpSpy.calls.mostRecent().args[0]).toMatch(new RegExp(`/campaigns/${testCampaign._id}$`));
        expect(httpSpy.calls.mostRecent().args[1]).toBe(changes);
      });
    });
  });
});
