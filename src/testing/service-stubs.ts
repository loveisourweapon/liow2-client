import { Injectable } from '@angular/core';

export const apiBaseUrlTest = 'http://localhost';

@Injectable()
export class DeedStubService {
  find() { }
}

@Injectable()
export class HttpStubService {
  get() { }
}

@Injectable()
export class StoreStubService<T> {
  select() { }
  dispatch() { }
}
