/**
 * Registry for DI container instances.
 */
export class Registry {
  private instances = new Map<symbol, any>();

  constructor() {}

  public set(token: symbol, ref: any) {
    this.instances.set(token, ref);
  }

  public get(token: symbol): any | undefined {
    return this.instances.get(token);
  }
}
