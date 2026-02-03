// API response state
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}


export type {User} from "./user";
export type {Post} from "./post";
export type {Todo} from "./todo";