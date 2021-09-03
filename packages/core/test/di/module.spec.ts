import { Module as ModuleDecorator } from '@hornts/common';

import { Module } from '../../lib';

describe('Module', () => {
  let module: Module;

  @ModuleDecorator()
  class AppModule {}

  it('should create module', () => {
    module = new Module(AppModule);

    expect(module).toBeInstanceOf(Module);
  });

  it('should return module token', () => {
    expect(module.getToken()).toStrictEqual('module:AppModule');
  });

  it('should return module meta', () => {
    expect(module.getMeta()).toStrictEqual({
      imports: [],
      injectables: [],
      exports: [],
      controllers: [],
    });
  });
});
