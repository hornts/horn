import { Type } from '@hornts/common';

import { HornApplication, HornOptions } from './horn.app';
import { HttpAdapter } from './http';

export class HornFactory {
  /**
   * Basic Horn factory creates Horn instance.
   * @returns {HornApplication}
   */
  public static async create<T extends HttpAdapter>(
    rootModule: Type<any>,
    httpAdapter: T,
    options?: HornOptions
  ): Promise<HornApplication<T>> {
    return new HornApplication(rootModule, httpAdapter, options);
  }
}
