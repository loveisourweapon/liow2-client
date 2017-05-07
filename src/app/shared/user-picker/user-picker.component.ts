import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { User } from '../../core/models';
import { identifyBy } from '../utils';

@Component({
  selector: 'liow-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPickerComponent {
  @Input() userList: User[];
  @Input() selectedIds: string[];
  @Input() lockedIds = [];
  @Input() disabled = false;
  @Output() change = new EventEmitter<string[]>();
  @ViewChild('modal') modal: ModalDirective;

  identifyBy = identifyBy;

  getSelectedUsers(userList: User[], selectedIds: string[]): User[] {
    return userList.filter((user: User) => selectedIds.indexOf(user._id) !== -1);
  }

  getNotSelectedUsers(userList: User[], selectedIds: string[]): User[] {
    return userList.filter((user: User) => selectedIds.indexOf(user._id) === -1);
  }

  showRemoveButton(user: User): boolean {
    return !this.disabled && this.lockedIds.indexOf(user._id) === -1;
  }

  onSelectClick(user: User): void {
    this.change.emit([...this.selectedIds, user._id]);
  }

  onRemoveClick(user: User): void {
    this.change.emit(this.selectedIds.filter((id: string) => id !== user._id));
  }

  openUserPicker(): void {
    this.modal.show();
  }
}
