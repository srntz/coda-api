export interface IService<T> {
  get(): Promise<T>;
}
