import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';

import { reducer } from './reducer';
import { ActService, CounterEffects } from './act';
import { AuthEffects, AuthService } from './auth';
import { DeedEffects, DeedService } from './deed';
import { FeedEffects, FeedService } from './feed';
import { GroupEffects, GroupService } from './group';
import { UserEffects, UserService } from './user';

@NgModule({
  imports: [
    NgrxStoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),

    EffectsModule.run(AuthEffects),
    EffectsModule.run(CounterEffects),
    EffectsModule.run(DeedEffects),
    EffectsModule.run(GroupEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(FeedEffects), // ordering appears to be important here
  ],
  providers: [
    ActService,
    AuthService,
    DeedService,
    FeedService,
    GroupService,
    UserService,
  ],
})
export class StoreModule { }
