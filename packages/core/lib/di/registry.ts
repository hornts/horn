/**
 * Registry for DI container instances.
 */
export class Registry {
  private instances = new Map<string, any>();

  constructor() {}

  public set(token: string, ref: any) {
    this.instances.set(token, ref);
  }

  public get(token: string): any | undefined {
    return this.instances.get(token);
  }
}
