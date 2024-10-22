import { Injectable } from '@angular/core';
import * as alertify from 'alertify.js';

@Injectable()
export class AlertifyService {
  constructor() {
    alertify.logPosition('top right').closeLogOnClick(true);
  }

  error(message: string, timeout = 6000, useTemplate = true): void {
    console.info('Alertify#error', message);
    return alertify
      .delay(timeout)
      .setLogTemplate((msg: string) =>
        useTemplate ? this.getLogTemplate('exclamation-circle', msg) : msg
      )
      .error(message);
  }

  log(message: string, timeout = 6000, useTemplate = true): void {
    console.info('Alertify#log', message);
    return alertify
      .delay(timeout)
      .setLogTemplate((msg: string) =>
        useTemplate ? this.getLogTemplate('info-circle', msg) : msg
      )
      .log(message);
  }

  success(message: string, timeout = 6000, useTemplate = true): void {
    console.info('Alertify#success', message);
    return alertify
      .delay(timeout)
      .setLogTemplate((msg: string) =>
        useTemplate ? this.getLogTemplate('check-circle', msg) : msg
      )
      .success(message);
  }

  private getLogTemplate(icon: string, message: string): string {
    return `<i class="fa fa-fw fa-${icon}"></i> ${message}`;
  }
}
