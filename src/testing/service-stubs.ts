import { Injectable } from '@angular/core';

@Injectable()
export class ActStubService {
  count() { }
  done() { }
}

@Injectable()
export class AlertifyStubService {
  alert() { }
  error() { }
  log() { }
  success() { }
}

@Injectable()
export class AuthStubService {
  authenticateEmail() { }
  authenticateFacebook() { }
  confirmEmail() { }
  isAdminOfGroup() { }
  isAuthenticated() { }
  isMemberOfGroup() { }
  logout() { }
  resetPassword() { }
  sendConfirmEmail() { }
  sendForgotPassword() { }
}

@Injectable()
export class CampaignStubService {
  find() { }
  findOne() { }
  save() { }
  update() { }
}

@Injectable()
export class CommentStubService {
  count() { }
  find() { }
  save() { }
}

@Injectable()
export class DeedStubService {
  countAll() { }
  find() { }
  findOne() { }
}

@Injectable()
export class FeedStubService {
  load() { }
}

@Injectable()
export class GroupStubService {
  count() { }
  find() { }
  findOne() { }
  save() { }
}

@Injectable()
export class HttpStubService {
  get() { }
  patch() { }
  post() { }
  put() { }
}

@Injectable()
export class ModalStubService {
  openForgotPassword() { }
  openLogin() { }
}

@Injectable()
export class Ng2AuthStubService {
  authenticate() { }
  isAuthenticated() { }
  login() { }
  logout() { }
}

@Injectable()
export class TitleStubService {
  clear() { }
  set() { }
}

@Injectable()
export class UserStubService {
  count() { }
  find() { }
  get() { }
  getCurrent() { }
  save() { }
  update() { }
}
