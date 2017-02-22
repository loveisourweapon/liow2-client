import { Injectable } from '@angular/core';

@Injectable()
export class ActStubService {
  count() { }
  done() { }
}

@Injectable()
export class AlertifyStubService {
  error() { }
  log() { }
  success() { }
}

@Injectable()
export class AuthStubService {
  authenticateEmail() { }
  authenticateFacebook() { }
  confirmEmail() { }
  isAuthenticated() { }
  logout() { }
  sendConfirmEmail() { }
}

@Injectable()
export class CommentStubService {
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
}

@Injectable()
export class HttpStubService {
  get() { }
  post() { }
  put() { }
}

@Injectable()
export class Ng2AuthStubService {
  authenticate() { }
  isAuthenticated() { }
  login() { }
  logout() { }
}

@Injectable()
export class StoreStubService<T> {
  select() { }
  dispatch() { }
}

@Injectable()
export class TitleStubService {
  clear() { }
  set() { }
}

@Injectable()
export class UserStubService {
  get() { }
  getCurrent() { }
  save() { }
  count() { }
}
