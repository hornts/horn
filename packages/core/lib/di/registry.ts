/**
 * Represents instances registry for DI container.
 */
export class Registry {
  private instances = new Map<symbol, any>();

  constructor() {}

  public add(token: symbol, ref: any) {
    this.instances.set(token, ref);
  }

  public get(token: symbol): any {
    return this.instances.get(token);
  }
}
