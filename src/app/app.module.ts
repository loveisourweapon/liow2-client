import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { CoreModule } from './core';
import { StoreModule } from './store';
import { ModalModule } from './modal';
import { ControlPanelModule } from './control-panel';
import { HomeModule } from './home';
import { DeedModule } from './deed';
import { GroupModule } from './group';
import { UserModule } from './user';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    StoreModule,
    ModalModule,
    ControlPanelModule,
    HomeModule,
    DeedModule,
    GroupModule,
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
