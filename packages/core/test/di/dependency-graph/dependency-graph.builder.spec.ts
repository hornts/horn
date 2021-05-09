import { Injectable, Module } from '@hornts/common';
import { DependencyGraphBuilder } from '@hornts/core';

describe('DependencyGraphBuilder', () => {
  it('should build dependency graph', () => {
    @Injectable()
    class ServiceB {
      constructor() {}
    }

    @Injectable()
    class ServiceA {
      constructor(private readonly service: ServiceB) {}
    }

    @Module({
      injectables: [ServiceA],
    })
    class ModuleC {}

    @Module({
      imports: [ModuleC],
    })
    class ModuleB {}

    @Module({
      imports: [ModuleC],
    })
    class ModuleA {}

    @Module({
      imports: [ModuleA, ModuleB],
    })
    class AppModule {}

    const graph = new DependencyGraphBuilder();

    graph.build(AppModule);

    const order = graph.getOverallOrder();

    expect(order).toStrictEqual([
      'injectable:ServiceB',
      'injectable:ServiceA',
      'module:ModuleC',
      'module:ModuleA',
      'module:ModuleB',
      'module:AppModule',
    ]);
  });
});
