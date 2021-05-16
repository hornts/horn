import { Injectable, LoggerService, Module, Scope } from '@hornts/common';
import { ApplicationContainer } from '@hornts/core';

describe('ApplicationContainer', () => {
  let container: ApplicationContainer;

  @Injectable({ scope: Scope.TRANSIENT })
  class ServiceB {}

  @Injectable()
  class ServiceA {
    constructor(private readonly service: ServiceB) {}
  }

  @Module({
    injectables: [ServiceA, ServiceB],
  })
  class AppModule {}

  it('should create container', () => {
    container = new ApplicationContainer(AppModule, (console as unknown) as LoggerService);

    expect(container).toBeInstanceOf(ApplicationContainer);
  });

  it('should init application container', () => {
    container.initialise();
  });
});
