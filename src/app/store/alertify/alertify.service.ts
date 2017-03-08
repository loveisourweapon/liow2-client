import { Injectable } from '@angular/core';
import * as alertify from 'alertify.js';

@Injectable()
export class AlertifyService {
  constructor() {
    alertify
      .logPosition('top right')
      .closeLogOnClick(true);
  }

  error(message: string, timeout = 6000, useTemplate = true): void {
    return alertify
      .delay(timeout)
      .setLogTemplate((message: string) => useTemplate ? this.getLogTemplate('exclamation-circle', message) : message)
      .error(message);
  }

  log(message: string, timeout = 6000, useTemplate = true): void {
    return alertify
      .delay(timeout)
      .setLogTemplate((message: string) => useTemplate ? this.getLogTemplate('info-circle', message) : message)
      .log(message);
  }

  success(message: string, timeout = 6000, useTemplate = true): void {
    return alertify
      .delay(timeout)
      .setLogTemplate((message: string) => useTemplate ? this.getLogTemplate('check-circle', message) : message)
      .success(message);
  }

  private getLogTemplate(icon: string, message: string): string {
    return `<i class="fa fa-fw fa-${icon}"></i> ${message}`;
  }
}
