import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { findIndex } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/if';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Group, GroupId, JsonPatchOp, ModalState, User } from '../../core/models';
import { AlertifyService, AuthService, GroupService, StateService, UserService } from '../../core/services';

@Component({
  selector: 'liow-group-join-modal',
  templateUrl: './group-join.component.html',
  styleUrls: ['./group-join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupJoinModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('groupSearch') groupSearch: ElementRef;
  @ViewChild('joinButton') joinButton: ElementRef;

  isSaving$ = new BehaviorSubject<boolean>(false);
  searchQuery$ = new BehaviorSubject<string>('');
  searchResults$: Observable<SearchItem[]>;
  selectedItem: SearchItem = null;
  errorMessage = '';

  private stateSubscription: Subscription;

  constructor(
    private alertify: AlertifyService,
    private auth: AuthService,
    private groupService: GroupService,
    private router: Router,
    private state: StateService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.stateSubscription = this.state.modal.groupJoin$
      .subscribe((state: ModalState) => {
        if (state.isOpen && !this.modal.isShown) {
          this.reset();
          this.modal.show();
        } else if (!state.isOpen && this.modal.isShown) {
          this.modal.hide();
        }
      });

    this.searchResults$ = this.searchQuery$
      .debounceTime(200)
      .switchMap((searchQuery: string) => Observable.if(
        () => searchQuery.length < 2,
        Observable.of([]),
        this.groupService.find({ query: searchQuery, fields: '_id,name,urlName' })
          .map((groups: Group[]) => groups.map((group: Group) => ({ id: group._id, ...group })))
      ));
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  onSave(group?: SearchItem): void {
    if (!group) {
      this.errorMessage = `Please search for and select a group to join.`;
      this.groupSearch.nativeElement.focus();
      return;
    }

    this.isSaving$.next(true);
    this.state.auth.user$
      .first()
      .switchMap((authUser: User) => Observable.if(
        () => findIndex(authUser.groups, (authGroup: Group) => authGroup._id === group._id) >= 0,

        // Already member of group, notify and close
        Observable.of(true)
          .do(() => this.alertify.log(`Already a member of group <b>${group.name}</b>`)),

        // Add user to group, notify and close
        this.userService.update(authUser, [{
          op: JsonPatchOp.Add,
          path: `/groups/-`,
          value: group._id,
        }])
          .switchMap(() => this.auth.loadCurrentUser())
          .do(() => this.alertify.success(`Joined group <b>${group.name}</b>`))
      ))
      .do(() => this.router.navigate(['/g', group.urlName]))
      .finally(() => this.isSaving$.next(false))
      .subscribe(
        () => this.onClose(),
        () => this.alertify.error(`Failed joining group <b>${group.name}</b>`),
      );
  }

  onSelectItem(item: SearchItem): void {
    this.searchQuery$.next('');
    this.selectedItem = item;
    this.errorMessage = '';
    this.joinButton.nativeElement.focus();
  }

  onClose(): void {
    this.state.modal.groupJoin$.next({ isOpen: false });
  }

  private reset(): void {
    this.isSaving$.next(false);
    this.searchQuery$.next('');
    this.selectedItem = null;
    this.errorMessage = '';
  }
}

interface SearchItem extends Group {
  id: GroupId;
}
