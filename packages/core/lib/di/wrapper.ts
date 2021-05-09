export abstract class Wrapper<T> {
  constructor(private readonly token: string, private readonly meta: T) {}

  public getToken(): string {
    return this.token;
  }

  public getMeta(): T {
    return this.meta;
  }
}
