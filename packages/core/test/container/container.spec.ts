import { Module } from '@hornts/common';
import { AppContainer } from '@hornts/core';

describe('AppContainer', () => {
  it('should pass', () => {
    @Module({
      controllers: [],
    })
    class TestModule {}

    const horn = new AppContainer();

    horn.addModule(TestModule);
  });
});
