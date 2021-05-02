import { Type } from '@hornts/common';

export class AppContainer {
  constructor(private readonly root: Type<any>) {}

  public instantiateDependency() {}
}
