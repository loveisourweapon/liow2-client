import { GroupId } from './group.model';

export type SalvationTestimonyId = string;

export interface SalvationTestimony {
  _id: SalvationTestimonyId;
  isFor: string;
  commitmentType: string;
  ageRange: string;
  churchConnection: string;
  group: GroupId;
  created: Date;
}

export interface NewSalvationTestimony {
  _id?: SalvationTestimonyId;
  isFor: string;
  commitmentType: string;
  ageRange: string;
  churchConnection: string;
  group?: GroupId;
}
