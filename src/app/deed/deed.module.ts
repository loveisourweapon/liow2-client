import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { DeedRoutingModule } from './deed-routing.module';
import { DeedComponent } from './deed.component';

@NgModule({
  imports: [
    SharedModule,
    DeedRoutingModule,
  ],
  declarations: [
    DeedComponent,
  ],
})
export class DeedModule { }
