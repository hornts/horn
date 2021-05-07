import { Injectable, Logger, Module } from '@hornts/common';
import { ApplicationContainer } from '@hornts/core';

describe('ApplicationContainer', () => {
  it('should initialize container', () => {
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

    const container = new ApplicationContainer(AppModule, (console as unknown) as Logger);
    container.initialise();
  });
});
