import { inject, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TitleService } from './title.service';

describe(`TitleService`, () => {
  let service: TitleService;
  let title: Title;

  const baseTitle = `BeKind`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TitleService,
        { provide: Title, useClass: TitleStubService },
      ],
    });
  });

  beforeEach(inject([TitleService], (_service: TitleService) => {
    service = _service;
    title = TestBed.get(Title);
  }));

  describe(`#clear`, () => {
    it(`should set the browser title to the base title`, () => {
      const titleSpy = spyOn(title, 'setTitle');
      service.clear();
      expect(titleSpy).toHaveBeenCalledWith(baseTitle);
    });
  });

  describe(`#set`, () => {
    it(`should set the browser title to the passed in title with the base title`, () => {
      const titleSpy = spyOn(title, 'setTitle');
      const newTitle = 'Test title';
      service.set(newTitle);
      expect(titleSpy).toHaveBeenCalledWith(`${newTitle} | ${baseTitle}`);
    });
  });
});

@Injectable()
class TitleStubService {
  setTitle() { }
}
