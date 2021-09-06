import 'reflect-metadata';

import { Controller, Scope } from '../../../lib';

describe('@Controller', () => {
  it('should create injectable class with no options', () => {
    @Controller()
    class Test {}

    expect(Reflect.getOwnMetadata('horn:controller', Test)).toStrictEqual({
      scope: Scope.SINGLETON,
    });
  });

  it('should create injectable class with options', () => {
    @Controller({
      scope: Scope.SINGLETON,
    })
    class Test {}

    expect(Reflect.getOwnMetadata('horn:controller', Test)).toStrictEqual({
      scope: Scope.SINGLETON,
    });
  });
});
