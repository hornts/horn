import 'reflect-metadata';

import { Injectable } from '../../../decorators/core';
import { Scope } from '../../../interfaces';

describe('@Injectable', () => {
  it('should create injectable class with no options', () => {
    @Injectable()
    class Test {}

    expect(Reflect.getOwnMetadata('horn:injectable', Test)).toStrictEqual({
      scope: Scope.SINGLETON,
    });
  });

  it('should create injectable class with options', () => {
    @Injectable({
      scope: Scope.TRANSIENT,
    })
    class Test {}

    expect(Reflect.getOwnMetadata('horn:injectable', Test)).toStrictEqual({
      scope: Scope.TRANSIENT,
    });
  });
});
