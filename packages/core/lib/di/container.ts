import { LoggerService, Type } from '@hornts/common';

import { ResolveDependencyError } from '../errors';
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
      }
    }
  }

  private instantiateModuleDependencies(module: Module) {
    const dependencies = this.graph.getDependenciesOf(module.getToken());

    for (let index = 0; index < dependencies.length; index++) {
      const node = this.graph.getNodeData(dependencies[index]);
      if (node instanceof Injectable) {
        this.instantiateInjectable(module, node);
      } else if (node instanceof Module) {
        module.setImport(node.getToken(), node);
      }
    }
  }

  private instantiateInjectable(module: Module, injectable: Injectable) {
    const injectables = [];
    const dependencies = injectable.getDependencies();
    for (let index = 0; index < dependencies.length; index++) {
      const token = `injectable:${dependencies[index].name}`;
      const instance = module.getInjectable(token);

      if (!instance) {
        throw new ResolveDependencyError(token, injectable.getToken());
      }

      injectables.push(instance);
    }

    const instance = injectable.instantiate(injectables);

    module.setInjectable(injectable.getToken(), instance);

    return instance;
  }
}
