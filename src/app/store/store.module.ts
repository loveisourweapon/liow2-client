import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';

import { DeedEffects } from './effects/deed';
import { reducer } from './reducers';
import { DeedService, GroupService } from './services';

@NgModule({
  imports: [
    NgrxStoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),

    EffectsModule.run(DeedEffects),
  ],
  providers: [
    DeedService,
    GroupService,
  ],
})
export class StoreModule { }
