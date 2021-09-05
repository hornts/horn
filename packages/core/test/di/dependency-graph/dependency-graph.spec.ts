import { Injectable, Module } from '@hornts/common';

import { DependencyGraph } from '../../../lib';

describe('DependencyGraph', () => {
  it('should build dependency graph', () => {
    @Injectable()
    class ServiceA {}

    @Module({
      injectables: [ServiceA],
    })
    class ModuleA {}

    @Module({
      imports: [ModuleA],
    })
    class AppModule {}

    const graph = new DependencyGraph();

    graph.build(AppModule);
  });
});
