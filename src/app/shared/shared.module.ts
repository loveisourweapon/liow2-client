import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap/modal';

import { DeedListComponent, DeedListHorizontalComponent, DeedListVerticalComponent } from './deed-list';
import { EmailValidatorDirective } from './email-validator.directive';
import { FeedComponent, FeedItemComponent } from './feed';
import { IconCheckedComponent } from './icon-checked';
import { InViewportDirective } from './in-viewport.directive';
import { JumbotronComponent } from './jumbotron';
import { LoadingSpinnerComponent } from './loading-spinner';
import { MarkedComponent } from './marked.component';
import { MediumEditorComponent } from './medium-editor';
import { SameAsValidatorDirective } from './same-as-validator.directive';
import { SwitchComponent } from './switch';
import { UserPickerComponent } from './user-picker';
import { YoutubePlayerComponent } from './youtube-player.component';

import { FromNowPipe } from './from-now.pipe';
import { KebabCasePipe } from './kebab-case.pipe';
import { LastPipe } from './last.pipe';
import { MomentPipe } from './moment.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule,
  ],
  declarations: [
    DeedListComponent,
    DeedListHorizontalComponent,
    DeedListVerticalComponent,
    EmailValidatorDirective,
    FeedComponent,
    FeedItemComponent,
    IconCheckedComponent,
    InViewportDirective,
    JumbotronComponent,
    LoadingSpinnerComponent,
    MarkedComponent,
    MediumEditorComponent,
    SameAsValidatorDirective,
    SwitchComponent,
    UserPickerComponent,
    YoutubePlayerComponent,

    FromNowPipe,
    KebabCasePipe,
    LastPipe,
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
    IconCheckedComponent,
    JumbotronComponent,
    LoadingSpinnerComponent,
    MarkedComponent,
    MediumEditorComponent,
    SameAsValidatorDirective,
    SwitchComponent,
    UserPickerComponent,
    YoutubePlayerComponent,

    FromNowPipe,
    KebabCasePipe,
    LastPipe,
    MomentPipe,
  ],
})
export class SharedModule { }
