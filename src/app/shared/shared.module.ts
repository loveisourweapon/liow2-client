import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
  ],
})
export class SharedModule { }
