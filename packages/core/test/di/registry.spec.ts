import { Registry } from '@hornts/core';

describe('Registry', () => {
  class Test {}

  let registry: Registry;

  const token = Symbol('Test');
  const test = new Test();

  beforeAll(() => {
    registry = new Registry();
  });

  it('should add instance', () => {
    registry.add(token, test);
  });

  it('should get instance', () => {
    expect(registry.get(token)).toEqual(test);
  });
});
