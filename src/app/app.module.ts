import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
