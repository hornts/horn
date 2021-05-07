import { Injectable, Logger, Module } from '@hornts/common';
import { ApplicationContainer } from '@hornts/core';

describe('ApplicationContainer', () => {
  let container: ApplicationContainer;

  @Injectable()
  class ServiceB {
    constructor() {}
  }

  @Injectable()
  class ServiceA {
    constructor(private readonly service: ServiceB) {}
  }

  @Module({
    injectables: [ServiceA],
  })
  class ModuleC {}

  @Module({
    imports: [ModuleC],
  })
  class ModuleB {}

  @Module({
    imports: [ModuleC],
  })
  class ModuleA {}

  @Module({
    imports: [ModuleA, ModuleB],
  })
  class AppModule {}

  beforeAll(() => {
    container = new ApplicationContainer(AppModule, (console as unknown) as Logger);
  });

  it('should initialize container', () => {
    container.initialise();
  });
});
