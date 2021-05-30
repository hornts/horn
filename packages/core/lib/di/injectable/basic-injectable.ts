import { BasicInjectableOptions, Scope, Type } from '@hornts/common';

import { Reflection } from '../reflection';

export abstract class BasicInjectable<T extends BasicInjectableOptions> {
  private instance?: any;

  private readonly dependencies: Type<any>[];

  constructor(
    private readonly ref: Type<any>,
    private readonly token: string,
    private readonly meta: T
  ) {
    this.dependencies = Reflection.getParamTypes(ref);
  }

  public getToken(): string {
    return this.token;
  }

  public getScope(): Scope {
    return this.meta.scope;
  }

  public instantiate(dependencies: any[] = []): any {
    if (!this.instance) {
      // eslint-disable-next-line new-cap
      this.instance = new this.ref(...dependencies);
    }

    return this.instance;
  }

  public getDependencies(): Type<any>[] {
    return this.dependencies;
  }

  public getInstance(): any {
    return this.instance;
  }
}
