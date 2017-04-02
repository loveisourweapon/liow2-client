import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { identifyBy } from '../utils';
import { User } from '../../store/user';

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
    return userList.filter((user: User) => selectedIds.includes(user._id));
  }

  getNotSelectedUsers(userList: User[], selectedIds: string[]): User[] {
    return userList.filter((user: User) => !selectedIds.includes(user._id));
  }

  showRemoveButton(user: User): boolean {
    return !this.disabled && !this.lockedIds.includes(user._id);
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
