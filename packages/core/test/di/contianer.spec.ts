import { Injectable, LoggerService, Module, Scope } from '@hornts/common';
import { ApplicationContainer, ResolveDependencyError } from '@hornts/core';

describe('ApplicationContainer', () => {
  let container: ApplicationContainer;

  it('should create container', () => {
    @Injectable({ scope: Scope.SINGLETON })
    class ServiceB {}

    @Injectable()
    class ServiceA {
      constructor(private readonly service: ServiceB) {}
    }

    @Module({
      injectables: [ServiceA, ServiceB],
    })
    class AppModule {}

    container = new ApplicationContainer(AppModule, (console as unknown) as LoggerService);

    expect(container).toBeInstanceOf(ApplicationContainer);
  });

  it('should init application container', () => {
    container.initialise();
  });

  it('shoult throw ResolveDependencyError', () => {
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

    container = new ApplicationContainer(AppModule, (console as unknown) as LoggerService);
    expect(() => container.initialise()).toThrowError(ResolveDependencyError);
  });
});
