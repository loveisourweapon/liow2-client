import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { DeedRoutingModule } from './deed-routing.module';

import { DeedComponent } from './deed.component';
import { CommentFormComponent } from './comment-form';

@NgModule({
  imports: [
    SharedModule,
    DeedRoutingModule,
  ],
  declarations: [
    DeedComponent,
    CommentFormComponent,
  ],
})
export class DeedModule { }
