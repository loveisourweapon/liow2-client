import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as Raven from 'raven-js';

import { CoreModule } from './core';
import { ControlPanelModule } from './control-panel';
import { DeedModule } from './deed';
import { GroupModule } from './group';
import { HomeModule } from './home';
import { ModalModule } from './modal';
import { SharedModule } from './shared';
import { UserModule } from './user';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
if (environment.sentry) {
  Raven.config(
    environment.appEnv.startsWith('liow')
      ? 'https://09637593de7a40beaed831589ac1ea37@o76421.ingest.us.sentry.io/165315'
      : 'https://18f0f543772ec0c294e58984840fd302@o76421.ingest.us.sentry.io/4510708686389248'
  ).install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    if (environment.sentry) {
      Raven.captureException(err.originalError);
    }
  }
}

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    ControlPanelModule,
    DeedModule,
    GroupModule,
    HomeModule,
    ModalModule,
    SharedModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: RavenErrorHandler }],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
