import { Type } from '@hornts/common';

import { Reflection } from '../reflection';

export abstract class BasicInjectable<T> {
  private instance?: any;

  private readonly dependencies: Type<any>[];

  constructor(
    private readonly ref: Type<any>,
    private readonly token: string,
    private readonly meta?: T
  ) {
    this.dependencies = Reflection.getParamTypes(ref);
  }

  public getToken(): string {
    return this.token;
  }

  public getMeta(): T {
    return this.meta;
  }

  public instantiate(dependencies: any[] = []): any {
    // eslint-disable-next-line new-cap
    this.instance = new this.ref(...dependencies);

    return this.instance;
  }

  public getDependencies(): Type<any>[] {
    return this.dependencies;
  }

  public getInstance(): any {
    return this.instance;
  }
}
