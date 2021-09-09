import { Controller, Get, Injectable, Module, Scope } from '@hornts/common';

import { Reflection } from '../../lib';

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

  it('should return ControllerOptions', () => {
    @Controller('test')
    class ControllerA {}

    const meta = Reflection.getControllerOptions(ControllerA);

    expect(meta).toStrictEqual({ path: 'test', scope: Scope.SINGLETON });
  });

  describe('HTTPMethodOptions', () => {
    it('should return HTTPMethodOptions when no options passed', () => {
      @Controller('test')
      class ControllerA {
        @Get()
        get() {}
      }

      const controller = new ControllerA();

      const meta = Reflection.getControllerHTTPMethodOptions(controller.get);

      expect(meta).toStrictEqual({ path: '/', type: 'GET' });
    });

    it('should return HTTPMethodOptions', () => {
      @Controller('test')
      class ControllerA {
        @Get('testget')
        get() {}
      }

      const controller = new ControllerA();

      const meta = Reflection.getControllerHTTPMethodOptions(controller.get);

      expect(meta).toStrictEqual({ path: 'testget', type: 'GET' });
    });
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
