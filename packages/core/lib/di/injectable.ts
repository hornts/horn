import { InjectableOptions, Type } from '@hornts/common';

import { Reflection } from './reflection';
import { Wrapper } from './wrapper';

/**
 * Represents DI instance.
 */
export class Injectable extends Wrapper<InjectableOptions> {
  private instance: any;

  private readonly dependencies: Type<any>[];

  constructor(private readonly ref: Type<any>) {
    super(`injectable:${ref.name}`, Reflection.getInjectableOptions(ref));

    this.dependencies = Reflection.getParamTypes(ref);
  }

  public instantiate(dependencies: any[] = []): any {
    // eslint-disable-next-line new-cap
    this.instance = new this.ref(...dependencies);

    return this.instance;
  }

  public getDependencies(): Type<any>[] {
    return this.dependencies;
  }
}
