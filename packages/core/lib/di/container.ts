import { LoggerService, Type } from '@hornts/common';

import { ResolveDependencyError } from '../errors';
import { DependencyGraph } from './dependency-graph';
import { Injectable } from './injectable';
import { Module } from './module';
import { Registry } from './registry';

export class ApplicationContainer {
  private readonly graph: DependencyGraph;

  private readonly registry: Registry;

  constructor(private readonly rootModuleRef: Type<any>, private readonly logger: LoggerService) {
    this.graph = new DependencyGraph();
    this.registry = new Registry();
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
    const order = this.graph.getLoadOrder();

    for (let index = 0; index < order.length; index++) {
      const node = this.graph.getNodeData(order[index]);
      if (node instanceof Injectable) {
        const instance = this.instantiateInjectable(node);
        console.log('instance: ', instance);
      } else if (node instanceof Module) {
        console.log('node: ', node);
      }
    }
  }

  private instantiateInjectable(injectable: Injectable): any {
    const injectables = [];
    const dependencies = injectable.getDependencies();
    for (let index = 0; index < dependencies.length; index++) {
      const token = `injectable:${dependencies[index].name}`;
      const injectable = this.registry.getInjectable(token);

      if (!injectable) {
        throw new ResolveDependencyError(token, injectable.getToken());
      }

      //TODO: check scope here and if TRANSIENT or SINGLETON init for module

      injectables.push(injectable);
    }

    const instance = injectable.instantiate(injectables);

    this.registry.setInjectable(injectable.getToken(), instance);

    return instance;
  }
}
