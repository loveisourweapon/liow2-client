export interface SearchItem {
  id: string;
  name: string;
  type: SearchItemType;
}

export class SearchItemType {
  static readonly Deed = 'Deed';
  static readonly Group = 'Group';
}
