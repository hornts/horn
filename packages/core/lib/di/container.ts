import { LoggerService, Type } from '@hornts/common';

import { DependencyGraph } from './dependency-graph';
import { BasicInjectable } from './injectable';
import { Module } from './module';

export class ApplicationContainer {
  private readonly graph: DependencyGraph;

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

    this.logger?.info('Application container started.');
  }

  private instantiateDependencies() {
    const order = this.graph.getLoadOrder();

    for (let index = 0; index < order.length; index++) {
      const node = this.graph.getNode(order[index]).getData();
      if (node instanceof Module) {
        const deps = this.graph.getdDirectDependenciesOf(node.getToken());
        console.log('name', node.getName());
        console.log('deps: ', deps);
      }
    }
  }
}
