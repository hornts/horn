import { Module } from '@hornts/common';
import { ApplicationContainer } from '@hornts/core';

describe('ApplicationContainer', () => {
  let container: ApplicationContainer;

  @Module()
  class BModule {}

  @Module({
    imports: [BModule],
  })
  class AModule {}

  @Module({
    imports: [AModule],
    controllers: [],
    providers: [],
    exports: [],
  })
  class AppModule {}

  beforeAll(() => {
    container = new ApplicationContainer(AppModule);
  });

  it('should load container', () => {
    container.load();
  });
});
