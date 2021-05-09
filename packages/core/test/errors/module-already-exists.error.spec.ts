import { ModuleAlreadyExistsError } from '@hornts/core';

describe('ModuleAlreadyExistsError', () => {
  it('should equal ModuleAlreadyExistsError', () => {
    const error = new ModuleAlreadyExistsError('test:token');

    expect(error.token).toBe('test:token');
    expect(error.message).toBe('Module test:token already exists.');
  });
});
