import { Registry } from '@hornts/core';

describe('Registry', () => {
  class Test {}

  let registry: Registry;

  const token = 'Test';
  const test = new Test();

  beforeAll(() => {
    registry = new Registry();
  });

  it('should set instance', () => {
    registry.set(token, test);
  });

  it('should get instance', () => {
    expect(registry.get(token)).toEqual(test);
  });
});
