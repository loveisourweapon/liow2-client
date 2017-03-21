import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';

import { reducer } from './reducer';
import { ActEffects, ActService, CounterEffects } from './act';
import { AlertifyEffects, AlertifyService } from './alertify';
import { AuthEffects, AuthService } from './auth';
import { CampaignService, GroupEffects, GroupService } from './group';
import { CommentEffects, CommentService } from './comment';
import { DeedEffects, DeedService } from './deed';
import { FeedEffects, FeedService } from './feed';
import { LayoutEffects } from './layout';
import { UserEffects, UserService } from './user';
import { GroupEditModalEffects } from './group-edit-modal';
import { CampaignEditModalEffects } from './campaign-edit-modal';
import { UserControlPanelEffects } from './control-panel/user';

@NgModule({
  imports: [
    NgrxStoreModule.provideStore(reducer, {
      router: { path: window.location.pathname + window.location.search },
    }),
    RouterStoreModule.connectRouter(),

    EffectsModule.run(ActEffects),
    EffectsModule.run(AlertifyEffects),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(CommentEffects),
    EffectsModule.run(CounterEffects),
    EffectsModule.run(DeedEffects),
    EffectsModule.run(FeedEffects),
    EffectsModule.run(GroupEffects),
    EffectsModule.run(LayoutEffects),
    EffectsModule.run(UserEffects),

    // Modals
    EffectsModule.run(CampaignEditModalEffects),
    EffectsModule.run(GroupEditModalEffects),

    // Control panels
    EffectsModule.run(UserControlPanelEffects),
  ],
  providers: [
    ActService,
    AlertifyService,
    AuthService,
    CampaignService,
    CommentService,
    DeedService,
    FeedService,
    GroupService,
    UserService,
  ],
})
export class StoreModule {
  constructor (@Optional() @SkipSelf() parentModule: StoreModule) {
    if (parentModule) {
      throw new Error(`StoreModule is already loaded. Import it in the AppModule only`);
    }
  }
}
