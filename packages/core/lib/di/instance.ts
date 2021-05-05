import { Type } from '@hornts/common';

/**
 * Represents DI instance
 */
export class Instance {
  private meta: any;

  constructor(private readonly instance: Type<any>) {}

  public getDependencies(): Type<any>[] {
    return [];
  }

  public instantiate(dependencies: any[]): any {
    // eslint-disable-next-line new-cap
    return new this.instance(...dependencies);
  }
}
