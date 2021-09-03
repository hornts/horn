import 'reflect-metadata';

import { Inject, INJECT_TOKEN_METADATA } from '../../../lib';

describe('@Inject', () => {
  it('should create class with @Inject decorator', () => {
    class Test {
      constructor(@Inject('TEST_TOKEN') private readonly number: number) {}
    }

    expect(Reflect.getOwnMetadata(INJECT_TOKEN_METADATA, Test)).toStrictEqual('TEST_TOKEN');
  });
});
