import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { DeedRoutingModule } from './deed-routing.module';

import { CommentFormComponent } from './comment-form';
import { DeedComponent } from './deed.component';

@NgModule({
  imports: [
    SharedModule,
    DeedRoutingModule,
  ],
  declarations: [
    CommentFormComponent,
    DeedComponent,
  ],
})
export class DeedModule { }
