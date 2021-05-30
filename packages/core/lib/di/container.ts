import { LoggerService, Type } from '@hornts/common';

import { DependencyGraph } from './dependency-graph';
import { Injectable } from './injectable';
import { Module } from './module';

export class ApplicationContainer {
  private readonly graph: DependencyGraph;

  constructor(private readonly rootModuleRef: Type<any>, private readonly logger: LoggerService) {
    this.graph = new DependencyGraph();
  }

  /**
   * Inits application container.
   */
  public initialise() {
    this.logger?.info('Building dependency graph...');
    this.graph.build(this.rootModuleRef);

    this.logger?.info('Instantiating dependencies...');
    this.instantiateDependencies();

    this.logger?.info('Application container started.');
  }

  private instantiateDependencies() {
    const order = this.graph.getModulesLoadOrder();

    for (let index = 0; index < order.length; index++) {
      const node = this.graph.getNodeData(order[index]);
      if (node instanceof Module) {
        this.instantiateModuleDependencies(node);
        console.log('node: ', node);
      }
    }
  }

  private instantiateModuleDependencies(module: Module) {
    const dependencies = this.graph.getDependenciesOf(module.getToken());
    console.log('Module: dependencies: ', dependencies);

    for (let index = 0; index < dependencies.length; index++) {
      const node = this.graph.getNodeData(dependencies[index]);
      if (node instanceof Injectable) {
        module.loadInjectableInstance(node.getToken());
      } else if (node instanceof Module) {
        module.setImport(node.getToken(), node);
      }
    }
  }
}
