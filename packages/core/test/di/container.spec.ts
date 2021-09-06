import { Controller, Injectable, Module } from '@hornts/common';

import { ApplicationContainer } from '../../lib';

describe('ApplicationContainer', () => {
  it('should create container', () => {
    @Injectable()
    class ServiceA {}

    @Controller()
    class ControllerA {
      constructor(private readonly serviceA: ServiceA) {}
    }

    @Module({
      controllers: [ControllerA],
      injectables: [ServiceA],
    })
    class ModuleA {}

    @Module({
      imports: [ModuleA],
    })
    class AppModule {}

    const container = new ApplicationContainer(AppModule);

    container.initialise();
  });
});
