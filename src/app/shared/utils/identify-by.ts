import { curry, get } from 'lodash';

function identifyByPath(path: string, idx: string, obj: any): string {
  return <string>get(obj, path);
}

export const identifyBy = curry(identifyByPath);
