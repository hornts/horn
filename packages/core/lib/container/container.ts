import { Type } from '@hornts/common';

export class AppContainer {
  constructor(private readonly rootModule: Type<any>) {}
}
