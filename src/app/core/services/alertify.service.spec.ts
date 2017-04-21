import { inject, TestBed } from '@angular/core/testing';
import * as alertify from 'alertify.js';

import { AlertifyService } from './index';

describe(`AlertifyService`, () => {
  let service: AlertifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertifyService,
      ],
    });
  });

  beforeEach(inject([AlertifyService], (_service: AlertifyService) => {
    service = _service;
  }));

  describe(`#error`, () => {
    it(`should pass error message through to alertify.js`, () => {
      const testMessage = 'Test error message';
      const errorSpy = spyOn(alertify, 'error');
      service.error(testMessage);
      expect(errorSpy).toHaveBeenCalledWith(testMessage);
    });
  });

  describe(`#log`, () => {
    it(`should pass log message through to alertify.js`, () => {
      const testMessage = 'Test log message';
      const logSpy = spyOn(alertify, 'log');
      service.log(testMessage);
      expect(logSpy).toHaveBeenCalledWith(testMessage);
    });
  });

  describe(`#success`, () => {
    it(`should pass log message through to alertify.js`, () => {
      const testMessage = 'Test success message';
      const successSpy = spyOn(alertify, 'success');
      service.success(testMessage);
      expect(successSpy).toHaveBeenCalledWith(testMessage);
    });
  });
});
