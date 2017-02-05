import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';

import { AuthEffects, CounterEffects, DeedEffects, FeedEffects, GroupEffects, UserEffects } from './effects';
import { ActService, AuthService, DeedService, FeedService, GroupService, UserService } from './services';
import { reducer } from './reducers';

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
