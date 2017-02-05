import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { DeedListComponent, DeedListHorizontalComponent, DeedListVerticalComponent } from './deed-list';
import { FeedComponent, FeedItemComponent } from './feed';
import { JumbotronComponent } from './jumbotron';
import { MarkedComponent } from './marked.component';
import { YoutubePlayerComponent } from './youtube-player.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule,
  ],
  declarations: [
    DeedListComponent,
    DeedListHorizontalComponent,
    DeedListVerticalComponent,
    FeedComponent,
    FeedItemComponent,
    JumbotronComponent,
    MarkedComponent,
    YoutubePlayerComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,

    DeedListComponent,
    FeedComponent,
    JumbotronComponent,
    MarkedComponent,
    YoutubePlayerComponent,
  ],
})
export class SharedModule { }
