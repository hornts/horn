import { Module } from '@hornts/common';
import { AppContainer } from '@hornts/core';

describe('DI', () => {
  describe('AppContainer', () => {
    it('should pass', () => {
      @Module({
        controllers: [],
      })
      class TestModule {}

      const horn = new AppContainer();
    });
  });
});
