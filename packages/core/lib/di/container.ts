import { Logger, ModuleOptions, Type } from '@hornts/common';
import { DepGraph } from 'dependency-graph';

import { Reflection } from './reflection';
import { Registry } from './registry';

/**
 * Application DI container.
 */
export class ApplicationContainer {
  private graph: DepGraph<Type<any>>;

  private readonly registry: Registry;

  constructor(private readonly rootModule: Type<any>, private readonly logger?: Logger) {
    this.registry = new Registry();
    this.graph = new DepGraph();
  }

  public initialize() {
    this.loadDependencies(this.rootModule);

    this.instantiateDependencies();

    this.logger?.info('Application container started.');
    console.log('test');
    console.log(this.graph.overallOrder().join(','));
  }

  private instantiateDependencies() {
    this.logger?.info('Instantiating dependencies...');
  }

  private loadDependencies(ref: Type<any>) {
    this.logger?.info('Loading dependency graph...');

    const meta = Reflection.getModuleOptions(ref);

    this.graph.addNode(`module:${ref.name}`, ref);

    this.loadInjectables(meta);
  }

  private loadInjectables(options: ModuleOptions) {
    for (let i = 0; i < options.injectables.length; i++) {
      const paramTypes = Reflection.getParamTypes(options.injectables[i]);
      console.log('paramTypes: ', paramTypes);
    }
  }
}
