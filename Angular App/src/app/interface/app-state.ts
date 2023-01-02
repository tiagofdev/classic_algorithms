import { DataState } from "../enum/data-state.enum";

export interface AppState<T> {
  dataState: DataState;
  response?: T;
  error?: string;
}
