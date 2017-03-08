export interface JsonPatch {
  op: JsonPatchOp;
  path: string;
  from?: string;
  value?: boolean|number|string;
}

export class JsonPatchOp {
  static readonly Add = 'add';
  static readonly Remove = 'remove';
  static readonly Replace = 'replace';
  static readonly Copy = 'copy';
  static readonly Move = 'move';
  static readonly Test = 'test';
}
