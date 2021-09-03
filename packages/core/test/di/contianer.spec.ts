import { Injectable, LoggerService, Module, Scope } from '@hornts/common';

import { ApplicationContainer, ResolveDependencyError } from '../../lib';

describe('ApplicationContainer', () => {
  let container: ApplicationContainer;

  it('should create container', () => {
    @Injectable()
    class ServiceC {}
    @Module({
      injectables: [ServiceC],
      exports: [ServiceC],
    })
    class ModuleA {}

    @Injectable({ scope: Scope.SINGLETON })
    class ServiceB {}

    @Injectable()
    class ServiceA {
      constructor(private readonly serviceb: ServiceB, private readonly servicec: ServiceC) {}
    }

    @Module({
      imports: [ModuleA],
      injectables: [ServiceA, ServiceB],
    })
    class AppModule {}

    container = new ApplicationContainer(AppModule, console as unknown as LoggerService);

    expect(container).toBeInstanceOf(ApplicationContainer);
  });

  it('should init application container', () => {
    container.initialise();
  });

  it('should throw ResolveDependencyError if ModuleA does not export ServiceA', () => {
    @Injectable({ scope: Scope.SINGLETON })
    class ServiceB {}

    @Injectable()
    class ServiceA {
      constructor(private readonly service: ServiceB) {}
    }

    @Module({
      injectables: [ServiceA, ServiceB],
    })
    class ModuleA {}

    @Injectable()
    class ServiceC {
      constructor(private readonly service: ServiceA) {}
    }
    @Module({
      imports: [ModuleA],
      injectables: [ServiceC],
    })
    class AppModule {}

    container = new ApplicationContainer(AppModule, console as unknown as LoggerService);
    expect(() => container.initialise()).toThrowError(ResolveDependencyError);
  });
});
