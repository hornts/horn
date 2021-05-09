import { CircularDependencyError } from '@hornts/core';

describe('CircularDependencyError', () => {
  it('should equal CircularDependencyError', () => {
    const error = new CircularDependencyError('test');

    expect(error.message).toBe('test');
  });
});
