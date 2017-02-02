import { Injectable } from '@angular/core';

@Injectable()
export class ActStubService {
  count() { }
}

@Injectable()
export class AuthStubService {
  authenticateEmail() { }
  authenticateFacebook() { }
  isAuthenticated() { }
  logout() { }
}

@Injectable()
export class DeedStubService {
  countAll() { }
  find() { }
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
export class UserStubService {
  get() { }
  getCurrent() { }
  count() { }
}
