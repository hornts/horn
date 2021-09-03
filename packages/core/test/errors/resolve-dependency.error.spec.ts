import { ResolveDependencyError } from '../../lib';

describe('ResolveDependencyError', () => {
  it('should equal ResolveDependencyError', () => {
    const error = new ResolveDependencyError('test:token', 'instance:token');

    expect(error.message).toBe(`Couldn't resolve dependency test:token for instance:token.`);
  });
});
