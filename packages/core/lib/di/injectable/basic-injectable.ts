import { BasicInjectableOptions, Scope, Type } from '@hornts/common';
import * as uuid from 'uuid';

import { Reflection } from '../reflection';

export abstract class BasicInjectable<T extends BasicInjectableOptions> {
  private readonly name: string;

  private readonly token: string;

  private readonly dependencies: Type<any>[];

  private instance?: any;

  constructor(private readonly ref: Type<any>, private readonly meta: T) {
    this.name = ref.name;
    this.token = uuid.v4();
    this.dependencies = Reflection.getParamTypes(ref);
  }

  public getName(): string {
    return this.name;
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

    return this.getInstance();
  }

  public getDependencies(): Type<any>[] {
    return this.dependencies;
  }

  public getInstance(): any {
    return this.instance;
  }
}
