import { LoggerService, Type } from '@hornts/common';

import { DependencyGraph } from './dependency-graph';
import { Controller, Injectable } from './injectable';
import { Module } from './module';

export class ApplicationContainer {
  private readonly graph: DependencyGraph;

  private readonly controllers: Controller[] = [];

  constructor(private readonly rootModuleRef: Type<any>, private readonly logger?: LoggerService) {
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
  }

  public getControllers(): Controller[] {
    return this.controllers;
  }

  private instantiateDependencies() {
    const order = this.graph.getLoadOrder();

    for (let index = 0; index < order.length; index++) {
      const node = this.graph.getNode(order[index]).getData();
      if (node instanceof Module) {
        const depsTokens = this.graph.getdDirectDependenciesOf(node.getToken());
        this.loadDependencies(node, depsTokens);
        node.instantiate();
      }
    }
  }

  private loadDependencies(module: Module, tokens: string[]) {
    for (let index = 0; index < tokens.length; index++) {
      const dependency = this.graph.getNode(tokens[index]).getData();

      if (dependency instanceof Injectable) {
        module.setInjectable(dependency);
      } else if (dependency instanceof Controller) {
        module.setController(dependency);
        this.controllers.push(dependency);
      } else if (dependency instanceof Module) {
        module.setImport(dependency);
      }
    }
  }
}
