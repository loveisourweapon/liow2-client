export interface Counters {
  [counterId: string]: number;
}

export interface CounterQuery {
  user?: string;
  group?: string;
  campaign?: string;
  deed?: string;
}

export interface DeedCounterResult {
  deed: string;
  count: number;
}
