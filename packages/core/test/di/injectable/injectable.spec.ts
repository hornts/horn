import { Injectable as InjectableDecorator, Scope } from '@hornts/common';
import { Injectable } from '@hornts/core';

describe('BasicInjectable', () => {
  let injectable: Injectable;

  @InjectableDecorator()
  class ServiceB {}

  @InjectableDecorator()
  class ServiceA {
    constructor(private readonly service: ServiceB) {}
  }

  it('should create injectable', () => {
    injectable = new Injectable(ServiceA);

    expect(injectable).toBeInstanceOf(Injectable);
  });

  it('should return meta', () => {
    expect(injectable.getMeta()).toStrictEqual({ scope: Scope.SINGLETON });
  });

  it('should return token', () => {
    expect(injectable.getToken()).toStrictEqual('injectable:ServiceA');
  });

  it('should return dependencies', () => {
    expect(injectable.getDependencies()).toStrictEqual([ServiceB]);
  });

  describe('instantiate', () => {
    let instance: ServiceA;

    it('should instantiate injectable', () => {
      instance = injectable.instantiate([new ServiceB()]);

      expect(instance).toBeInstanceOf(ServiceA);
    });

    it('should return instance', () => {
      expect(injectable.getInstance()).toBe(instance);
    });
  });
});
