import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';

import { AuthEffects, DeedEffects } from './effects';
import { AuthService, DeedService, GroupService, UserService } from './services';
import { reducer } from './reducers';

@NgModule({
  imports: [
    NgrxStoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),

    EffectsModule.run(AuthEffects),
    EffectsModule.run(DeedEffects),
  ],
  providers: [
    AuthService,
    DeedService,
    GroupService,
    UserService,
  ],
})
export class StoreModule { }
