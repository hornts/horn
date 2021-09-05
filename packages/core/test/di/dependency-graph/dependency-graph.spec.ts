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

    const order = graph.getLoadOrder();

    expect(order.length).toBe(3);
    expect(graph.getNode(order[0]).getData().getName()).toBe('ServiceA');
    expect(graph.getNode(order[1]).getData().getName()).toBe('ModuleA');
    expect(graph.getNode(order[2]).getData().getName()).toBe('AppModule');
  });
});
