import { Type } from '@hornts/common';

import { HornApplication } from './horn.app';
import { HttpAdapter } from './http';

export class HornFactory {
  public static async create<T extends HttpAdapter>(
    root: Type<any>,
    adapter: T
  ): Promise<HornApplication<T>> {
    return new HornApplication(root, adapter);
  }
}
