import { LoggerService, Type } from '@hornts/common';

import { DependencyGraph } from './dependency-graph';

export class ApplicationContainer {
  private readonly graph: DependencyGraph;

  constructor(private readonly rootModule: Type<any>, private readonly logger: LoggerService) {
    this.graph = new DependencyGraph();
  }

  /**
   * Inits application container.
   */
  public initialise() {
    this.logger?.info('Building dependency graph...');
    this.graph.build(this.rootModule);

    this.logger?.info('Instantiating dependencies...');
    // this.instantiateDependencies();

    this.logger?.info('Application container started.');
  }
}
