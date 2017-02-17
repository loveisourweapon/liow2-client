import { inject, TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';

import { AlertifyEffects, AlertifyService } from './index';
import * as alert from './alertify.actions';
import { AlertifyStubService } from '../../../testing';

describe(`AlertifyEffects`, () => {
  let runner: EffectsRunner;
  let alertifyEffects: AlertifyEffects;
  let alertify: AlertifyService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          EffectsTestingModule,
        ],
        providers: [
          AlertifyEffects,
          { provide: AlertifyService, useClass: AlertifyStubService },
        ],
      });
  });

  beforeEach(inject([EffectsRunner, AlertifyEffects], (_runner, _alertifyEffects) => {
    runner = _runner;
    alertifyEffects = _alertifyEffects;
    alertify = TestBed.get(AlertifyService);
  }));

  describe(`error$`, () => {
    it(`should call alertify.error with provided message`, () => {
      const testMessage = 'Test error message';
      const errorSpy = spyOn(alertify, 'error');
      runner.queue(new alert.ErrorAction(testMessage));
      alertifyEffects.error$.subscribe(() => {
        expect(errorSpy).toHaveBeenCalledWith(testMessage);
      });
    });
  });

  describe(`log$`, () => {
    it(`should call alertify.log with provided message`, () => {
      const testMessage = 'Test log message';
      const logSpy = spyOn(alertify, 'log');
      runner.queue(new alert.LogAction(testMessage));
      alertifyEffects.log$.subscribe(() => {
        expect(logSpy).toHaveBeenCalledWith(testMessage);
      });
    });
  });

  describe(`success$`, () => {
    it(`should call alertify.success with provided message`, () => {
      const testMessage = 'Test success message';
      const successSpy = spyOn(alertify, 'success');
      runner.queue(new alert.SuccessAction(testMessage));
      alertifyEffects.success$.subscribe(() => {
        expect(successSpy).toHaveBeenCalledWith(testMessage);
      });
    });
  });
});
