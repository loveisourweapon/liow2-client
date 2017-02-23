import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { DeedListComponent, DeedListHorizontalComponent, DeedListVerticalComponent } from './deed-list';
import { EmailValidatorDirective } from './email-validator.directive';
import { FeedComponent, FeedItemComponent } from './feed';
import { JumbotronComponent } from './jumbotron';
import { LoadingSpinnerComponent } from './loading-spinner';
import { MarkedComponent } from './marked.component';
import { MediumEditorComponent } from './medium-editor';
import { SameAsValidatorDirective } from './same-as-validator.directive';
import { SwitchComponent } from './switch';
import { YoutubePlayerComponent } from './youtube-player.component';
import { FromNowPipe } from './from-now.pipe';
import { MomentPipe } from './moment.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InfiniteScrollModule,
  ],
  declarations: [
    DeedListComponent,
    DeedListHorizontalComponent,
    DeedListVerticalComponent,
    EmailValidatorDirective,
    FeedComponent,
    FeedItemComponent,
    JumbotronComponent,
    LoadingSpinnerComponent,
    MarkedComponent,
    MediumEditorComponent,
    SameAsValidatorDirective,
    SwitchComponent,
    YoutubePlayerComponent,

    FromNowPipe,
    MomentPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,

    DeedListComponent,
    EmailValidatorDirective,
    FeedComponent,
    JumbotronComponent,
    LoadingSpinnerComponent,
    MarkedComponent,
    MediumEditorComponent,
    SameAsValidatorDirective,
    SwitchComponent,
    YoutubePlayerComponent,

    FromNowPipe,
    MomentPipe,
  ],
})
export class SharedModule { }
