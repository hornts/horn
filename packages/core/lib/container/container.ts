import { Type } from '@hornts/common';

import { Injector } from './injector';

export class AppContainer {
  private readonly injector: Injector;

  constructor(private readonly rootModule: Type<any>) {
    this.injector = new Injector();
  }

  public load() {}
}
