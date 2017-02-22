import { URLSearchParams } from '@angular/http';
import { keys } from 'lodash';

import { NativeQueryEncoder } from './native-query-encoder';

export interface SearchParams {
  [key: string]: any;
}

export function buildUrlSearchParams(params: SearchParams) {
  const search = new URLSearchParams('', new NativeQueryEncoder());
  keys(params).forEach((key: string) => search.set(key, params[key]));

  return search;
}
