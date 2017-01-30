import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Group } from '../store/models';
import * as fromRoot from '../store/reducers';
import * as fromLoginModal from '../store/reducers/modal/login';

@Component({
  selector: 'liow-modals',
  templateUrl: './modals.component.html',
})
export class ModalsComponent implements OnInit {
  currentGroup$: Observable<Group>;
  loginModal$: Observable<fromLoginModal.State>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.currentGroup$ = this.store.select(fromRoot.getCurrentGroup);
    this.loginModal$ = this.store.select(fromRoot.getLoginModal);
  }
}
