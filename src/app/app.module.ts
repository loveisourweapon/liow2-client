import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core';
import { StoreModule } from './store';
import { ModalModule } from './modal';
import { HomeModule } from './home';
import { DeedModule } from './deed';
import { GroupModule } from './group';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    StoreModule,
    ModalModule,
    HomeModule,
    DeedModule,
    GroupModule,
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
