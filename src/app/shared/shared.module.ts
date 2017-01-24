import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DeedListComponent, DeedListHorizontalComponent, DeedListVerticalComponent } from './deed-list';
import { JumbotronComponent } from './jumbotron';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    DeedListComponent,
    DeedListHorizontalComponent,
    DeedListVerticalComponent,
    JumbotronComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,

    DeedListComponent,
    JumbotronComponent,
  ],
})
export class SharedModule { }
