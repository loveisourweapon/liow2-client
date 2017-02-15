import { URLSearchParams } from '@angular/http';
import { keys } from 'lodash';

const actionTypeCache: { [label: string]: boolean } = { };
export function actionType<T>(label: T | ''): T {
  if (actionTypeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  actionTypeCache[<string>label] = true;

  return <T>label;
}

export interface SearchParams {
  [key: string]: any;
}

export function buildUrlSearchParams(params: SearchParams) {
  const search = new URLSearchParams();
  keys(params).forEach((key: string) => search.set(key, params[key]));

  return search;
}
