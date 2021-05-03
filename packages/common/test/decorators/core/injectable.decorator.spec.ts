import 'reflect-metadata';

import { Injectable, Scope } from '@hornts/common';

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
      scope: Scope.SINGLETON,
    })
    class Test {}

    expect(Reflect.getOwnMetadata('horn:injectable', Test)).toStrictEqual({
      scope: Scope.SINGLETON,
    });
  });
});
