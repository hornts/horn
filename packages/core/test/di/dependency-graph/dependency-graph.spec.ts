import { Injectable, Module } from '@hornts/common';

import { CircularDependencyError, DependencyGraph } from '../../../lib';

describe('DependencyGraph', () => {
  let graph: DependencyGraph;

  beforeEach(() => {
    graph = new DependencyGraph();
  });

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

    graph.build(AppModule);

    expect(graph.getModulesLoadOrder()).toStrictEqual(['module:ModuleA', 'module:AppModule']);
  });

  it('should throw CircularDependencyError', () => {
    @Injectable()
    class ServiceA {
      constructor(private readonly service: ServiceA) {}
    }

    @Module({
      injectables: [ServiceA],
    })
    class ModuleA {}

    graph.build(ModuleA);

    expect(() => graph.getModulesLoadOrder()).toThrowError(CircularDependencyError);
  });
});
