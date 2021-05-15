import { Injectable, Module, Scope } from '@hornts/common';
import { Reflection } from '@hornts/core';

describe('Reflection', () => {
  it('should return empty ModuleOptions when no options passed', () => {
    @Module()
    class App {}

    const meta = Reflection.getModuleOptions(App);

    expect(meta).toStrictEqual({
      imports: [],
      controllers: [],
      injectables: [],
      exports: [],
    });
  });

  it('should return ModuleOptions', () => {
    @Module()
    class ModuleA {}

    @Module({
      imports: [ModuleA],
    })
    class App {}

    const meta = Reflection.getModuleOptions(App);

    expect(meta).toStrictEqual({
      imports: [ModuleA],
      controllers: [],
      injectables: [],
      exports: [],
    });
  });

  it('should return InjectableOptions when no options passed', () => {
    @Injectable()
    class Service {}

    const meta = Reflection.getInjectableOptions(Service);

    expect(meta).toStrictEqual({ scope: Scope.SINGLETON });
  });

  it('should return InjectableOptions', () => {
    @Injectable({ scope: Scope.SINGLETON })
    class Service {}

    const meta = Reflection.getInjectableOptions(Service);

    expect(meta).toStrictEqual({ scope: Scope.SINGLETON });
  });

  it(`should return empty array of params when constructor parameters don't exists`, () => {
    class ServiceA {
      constructor() {}
    }

    const meta = Reflection.getParamTypes(ServiceA);

    expect(meta).toStrictEqual([]);
  });

  it('should return ParamTypes', () => {
    @Injectable()
    class ServiceB {}

    @Injectable()
    class ServiceA {
      constructor(private readonly service: ServiceB) {}
    }

    const meta = Reflection.getParamTypes(ServiceA);

    expect(meta).toStrictEqual([ServiceB]);
  });
});
