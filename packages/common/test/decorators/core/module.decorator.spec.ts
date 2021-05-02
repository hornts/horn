import 'reflect-metadata';

import { Module } from '@hornts/common';

describe('@Module', () => {
  it('should create module class with no options', () => {
    @Module()
    class AppModule {}

    expect(Reflect.getOwnMetadata('horn:module', AppModule)).toStrictEqual({});
  });
});
