import { Injectable, Module } from '@hornts/common';
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
  class ModuleA {}

  @Module({
    imports: [ModuleA],
    injectables: [ServiceA],
  })
  class AppModule {}

  beforeAll(() => {
    container = new ApplicationContainer(AppModule);
  });

  it('should initialize container', () => {
    container.initialise();
  });
});
