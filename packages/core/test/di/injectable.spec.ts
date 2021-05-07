import { Injectable as InjectableDecorator, Scope } from '@hornts/common';
import { Injectable } from '@hornts/core';

describe('Instance', () => {
  @InjectableDecorator()
  class User {
    constructor(private readonly age: number) {}
  }

  let instance: Injectable;

  beforeAll(() => {
    instance = new Injectable(User);
  });

  it('should get token', () => {
    expect(instance.getToken()).toStrictEqual('injectable:User');
  });

  it('should get meta', () => {
    expect(instance.getMeta()).toStrictEqual({ scope: Scope.SINGLETON });
  });

  it('should get dependencies', () => {
    expect(instance.getDependencies()).toStrictEqual([Number]);
  });

  it('should instantiate instance', () => {
    const user = instance.instantiate([10]);

    expect(user).toStrictEqual(new User(10));
  });
});
