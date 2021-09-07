import 'reflect-metadata';

import { Controller, Scope } from '../../../lib';

describe('@Controller', () => {
  it('should create injectable class with path string', () => {
    @Controller('test')
    class Test {}

    expect(Reflect.getOwnMetadata('horn:controller', Test)).toStrictEqual({
      path: 'test',
      scope: Scope.SINGLETON,
    });
  });

  it('should create injectable class with options', () => {
    @Controller({
      path: 'test',
      scope: Scope.SINGLETON,
    })
    class Test {}

    expect(Reflect.getOwnMetadata('horn:controller', Test)).toStrictEqual({
      path: 'test',
      scope: Scope.SINGLETON,
    });
  });
});
