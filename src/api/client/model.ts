export interface IFetchResponse<T> {
  data: T | undefined;
  isError: boolean;
  error: string;
}
