import { Get, HTTPMethodType } from '../../../../../lib';

describe('@Get', () => {
  it('should create controller with get method without options', () => {
    class ControllerA {
      @Get()
      test() {}
    }

    const controller = new ControllerA();

    expect(Reflect.getOwnMetadata('horn:controller:method', controller.test)).toStrictEqual({
      path: '/',
      type: HTTPMethodType.GET,
    });
  });

  it('should create controller with get method with options', () => {
    class ControllerA {
      @Get('test')
      test() {}
    }

    const controller = new ControllerA();

    expect(Reflect.getOwnMetadata('horn:controller:method', controller.test)).toStrictEqual({
      path: 'test',
      type: HTTPMethodType.GET,
    });
  });
});
