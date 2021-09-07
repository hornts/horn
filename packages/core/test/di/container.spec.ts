import { Controller, Injectable, Module, Scope } from '@hornts/common';

import { ApplicationContainer } from '../../lib';

describe('ApplicationContainer', () => {
  it('should create container', () => {
    @Injectable()
    class ServiceC {}

    @Module({
      injectables: [ServiceC],
      exports: [ServiceC],
    })
    class ModuleB {}

    @Injectable()
    class ServiceB {
      constructor(private readonly serviceC: ServiceC) {}
    }

    @Injectable()
    class ServiceA {
      constructor(private readonly serviceB: ServiceB) {}
    }

    @Controller({ path: 'test', scope: Scope.SINGLETON })
    class ControllerA {
      constructor(private readonly serviceA: ServiceA) {}
    }

    @Module({
      imports: [ModuleB],
      controllers: [ControllerA],
      injectables: [ServiceA, ServiceB],
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
