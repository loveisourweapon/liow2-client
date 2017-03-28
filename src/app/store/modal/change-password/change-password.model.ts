import { User } from '../../user';

export interface ChangePasswordRequest {
  user: User;
  currentPassword: string;
  newPassword: string;
}
