import { Injectable, Scope } from '@hornts/common';
import { Instance } from '@hornts/core';

describe('Instance', () => {
  @Injectable()
  class User {
    constructor(private readonly age: number) {}
  }

  let instance: Instance;

  beforeAll(() => {
    instance = new Instance(User);
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
