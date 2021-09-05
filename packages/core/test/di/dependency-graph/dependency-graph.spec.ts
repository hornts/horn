import { Controller, Injectable, Module } from '@hornts/common';

import { CircularDependencyError, DependencyGraph } from '../../../lib';

describe('DependencyGraph', () => {
  it('should build dependency graph', () => {
    @Injectable()
    class ServiceA {}

    @Controller()
    class ControllerA {
      constructor(serviceA: ServiceA) {}
    }

    @Module({
      controllers: [ControllerA],
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

    expect(order.length).toBe(4);
    expect(graph.getNode(order[0]).getData().getName()).toBe('ServiceA');
    expect(graph.getNode(order[1]).getData().getName()).toBe('ControllerA');
    expect(graph.getNode(order[2]).getData().getName()).toBe('ModuleA');
    expect(graph.getNode(order[3]).getData().getName()).toBe('AppModule');
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

    const graph = new DependencyGraph();

    graph.build(ModuleA);

    expect(() => graph.getLoadOrder()).toThrowError(CircularDependencyError);
  });
});
