import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ActStubService {
  count() {}
  done() {}
}

@Injectable()
export class AlertifyStubService {
  alert() {}
  error() {}
  log() {}
  success() {}
}

@Injectable()
export class AuthStubService {
  authenticateEmail() {}
  authenticateFacebook() {}
  confirmEmail() {}
  isAdminOfGroup() {}
  isAuthenticated() {}
  isMemberOfGroup() {}
  isSuperAdmin() {}
  logout() {}
  resetPassword() {}
  sendConfirmEmail() {}
  sendForgotPassword() {}
}

@Injectable()
export class CampaignStubService {
  find() {}
  findOne() {}
  save() {}
  update() {}
}

@Injectable()
export class CommentStubService {
  approve() {}
  count() {}
  countPending() {}
  find() {}
  reject() {}
  remove() {}
  save() {}
}

@Injectable()
export class DeedStubService {
  countAll() {}
  find() {}
  findOne() {}
}

@Injectable()
export class FeedStubService {
  load() {}
}

@Injectable()
export class GroupStubService {
  count() {}
  find() {}
  findOne() {}
  save() {}
}

@Injectable()
export class HttpStubService {
  get() {}
  patch() {}
  post() {}
  put() {}
}

@Injectable()
export class MetaStubService {
  clear() {}
  set() {}
}

@Injectable()
export class ModalStubService {
  openForgotPassword() {}
  openLogin() {}
}

@Injectable()
export class Ng2AuthStubService {
  authenticate() {}
  isAuthenticated() {}
  login() {}
  logout() {}
}

@Injectable()
export class TitleStubService {
  clear() {}
  set() {}
}

@Injectable()
export class UserStubService {
  count() {}
  find() {}
  get() {}
  getCurrent() {}
  save() {}
  // AuthService#loadCurrentUser subscribes to the result
  update(): Observable<any> {
    return Observable.of({});
  }
}
