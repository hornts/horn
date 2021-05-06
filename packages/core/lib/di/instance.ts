import { Type } from '@hornts/common';

/**
 * Represents DI instance
 */
export class Instance {
  constructor(private readonly instance: Type<any>) {}

  public instantiate(dependencies: any[]): any {
    // eslint-disable-next-line new-cap
    return new this.instance(...dependencies);
  }
}
