import { Module as ModuleDecorator } from '@hornts/common';
import { Module } from '@hornts/core';

describe('Module', () => {
  @ModuleDecorator()
  class AppModule {}

  let module: Module;

  beforeAll(() => {
    module = new Module(AppModule);
  });

  it('should return module token', () => {
    expect(module.getToken()).toStrictEqual('module:AppModule');
  });

  it('should return module metadata', () => {
    expect(module.getMeta()).toStrictEqual({
      imports: [],
      injectables: [],
      exports: [],
      controllers: [],
    });
  });
});
