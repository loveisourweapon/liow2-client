import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { CoreModule } from './core';
import { StoreModule } from './store';
import { ControlPanelModule } from './control-panel';
import { DeedModule } from './deed';
import { GroupModule } from './group';
import { HomeModule } from './home';
import { ModalModule } from './modal';
import { UserModule } from './user';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    StoreModule,
    ControlPanelModule,
    DeedModule,
    GroupModule,
    HomeModule,
    ModalModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [
    Title,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
