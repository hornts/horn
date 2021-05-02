import { Module } from '@hornts/common';
import { Horn } from '@hornts/core';

describe('HornFactory', () => {
  @Module()
  class AppModule {}

  const horn = Horn.create(AppModule);
});
