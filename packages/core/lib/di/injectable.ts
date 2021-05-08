import { InjectableOptions, Type } from '@hornts/common';

import { Reflection } from './reflection';

/**
 * Represents DI instance.
 */
export class Injectable {
  private instance: any;

  private readonly token: string;

  private readonly meta: InjectableOptions;

  private readonly dependencies: Type<any>[];

  constructor(private readonly ref: Type<any>) {
    this.token = `injectable:${this.ref.name}`;
    this.meta = Reflection.getInjectableOptions(ref);
    this.dependencies = Reflection.getParamTypes(ref);
  }

  public instantiate(dependencies: any[] = []): any {
    // eslint-disable-next-line new-cap
    this.instance = new this.ref(...dependencies);

    return this.instance;
  }

  public getToken(): string {
    return this.token;
  }

  public getMeta(): InjectableOptions {
    return this.meta;
  }

  public getDependencies(): Type<any>[] {
    return this.dependencies;
  }
}
