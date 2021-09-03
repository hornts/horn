import 'reflect-metadata';

import { Module } from '../../../lib';

describe('@Module', () => {
  it('should create module class with no options', () => {
    @Module()
    class AppModule {}

    expect(Reflect.getOwnMetadata('horn:module', AppModule)).toStrictEqual({});
  });
});
