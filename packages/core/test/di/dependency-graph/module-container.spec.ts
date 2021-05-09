import { Module as ModuleDecorator } from '@hornts/common';
import { Module, ModuleAlreadyExistsError, ModuleContainer } from '@hornts/core';

describe('ModuleContainer', () => {
  @ModuleDecorator()
  class AppModule {}

  let module: Module;
  let moduleContainer: ModuleContainer;

  beforeAll(() => {
    module = new Module(AppModule);
    moduleContainer = new ModuleContainer();
  });

  it('should set module into module container', () => {
    moduleContainer.set(module);

    expect(moduleContainer.get('module:AppModule')).toEqual(module);
  });

  it('should throw ModuleAlreadyExistsError', () => {
    expect(() => moduleContainer.set(module)).toThrow(ModuleAlreadyExistsError);
  });
});
