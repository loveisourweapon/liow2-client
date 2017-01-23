import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DeedListComponent, DeedListHorizontalComponent, DeedListVerticalComponent } from './deed-list';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    DeedListComponent,
    DeedListHorizontalComponent,
    DeedListVerticalComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,

    DeedListComponent,
  ],
})
export class SharedModule { }
