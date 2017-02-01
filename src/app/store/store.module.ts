import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';

import { AuthEffects, CounterEffects, DeedEffects, GroupEffects, UserEffects } from './effects';
import { ActService, AuthService, DeedService, GroupService, UserService } from './services';
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
  ],
  providers: [
    ActService,
    AuthService,
    DeedService,
    GroupService,
    UserService,
  ],
})
export class StoreModule { }
