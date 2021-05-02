import { Module } from '@hornts/common';
import { AppContainer } from '@hornts/core';

describe('AppContainer', () => {
  const horn = new AppContainer();

  it('should pass', () => {
    @Module()
    class TestModule {}

    horn.addModule('horn:root', TestModule);
  });
  it('should pass', () => {
    @Module()
    class TestModule {}

    horn.addModule('horn:root', TestModule);
  });
});
