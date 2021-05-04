import { Logger, ModuleOptions, Type } from '@hornts/common';
import { DepGraph } from 'dependency-graph';

import { Reflection } from './reflection';
import { Registry } from './registry';

export class ApplicationContainer {
  private graph: DepGraph<Type<any>>;

  private readonly registry: Registry;

  constructor(private readonly rootModule: Type<any>, private readonly logger?: Logger) {
    this.registry = new Registry();
    this.graph = new DepGraph();
  }

  public initialize() {
    this.load();

    this.instantiateDependencies();

    this.logger?.info('Application container started.');
  }

  private instantiateDependencies() {
    this.logger?.info('Instantiating dependencies...');
  }

  private load() {
    this.logger?.info('Loading dependency graph...');

    // const rootOptions = Reflection.getModuleOptions(this.rootModule);

    // this.loadInjectables(rootOptions);
  }

  // private loadInjectables(options: ModuleOptions) {
  //   for (let i = 0; i < options.injectables.length; i++) {
  //     const paramTypes = Reflection.getParamTypes(options.injectables[i]);
  //     console.log('paramTypes: ', paramTypes);
  //   }
  // }
}
