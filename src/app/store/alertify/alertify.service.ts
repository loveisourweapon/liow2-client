import { Injectable } from '@angular/core';
import * as alertify from 'alertify.js';

@Injectable()
export class AlertifyService {
  constructor() {
    alertify
      .logPosition('top right')
      .closeLogOnClick(true);
  }

  error(message: string): void {
    return alertify
      .setLogTemplate((message: string) => this.getLogTemplate('exclamation-circle', message))
      .error(message);
  }

  log(message: string): void {
    return alertify
      .setLogTemplate((message: string) => this.getLogTemplate('info-circle', message))
      .log(message);
  }

  success(message: string): void {
    return alertify
      .setLogTemplate((message: string) => this.getLogTemplate('check-circle', message))
      .success(message);
  }

  private getLogTemplate(icon: string, message: string): string {
    return `<i class="fa fa-fw fa-${icon}"></i> ${message}`;
  }
}
