import { Injectable, Module } from '@hornts/common';
import { DependencyGraph } from '@hornts/core';

describe('DependencyGraph', () => {
  let graph: DependencyGraph;

  @Injectable()
  class ServiceA {}

  @Module({
    injectables: [ServiceA],
  })
  class ModuleA {}

  beforeAll(() => {
    graph = new DependencyGraph();
  });

  it('should build dependency graph', () => {
    graph.build(ModuleA);

    expect(graph.getLoadOrder()).toStrictEqual(['injectable:ServiceA', 'module:ModuleA']);
  });
});
