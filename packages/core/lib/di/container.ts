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

  /**
   * Inits application container.
   */
  public initialise() {
    this.loadDependencies(this.rootModule);

    this.instantiateDependencies();

    this.logger?.info('Application container started.');

    console.log(this.graph.overallOrder().join(','));
  }

  private instantiateDependencies() {
    this.logger?.info('Instantiating dependencies...');
  }

  private loadDependencies(ref: Type<any>) {
    this.logger?.info('Loading dependency graph...');

    const meta = Reflection.getModuleOptions(ref);

    const node = `module:${ref.name}`;

    this.graph.addNode(node, ref);

    this.loadInjectables(node, meta);

    for (let i = 0; i < meta.imports.length; i++) {
      this.loadDependencies(meta.imports[i]);
    }
  }

  private loadInjectables(node: string, options: ModuleOptions) {
    for (let i = 0; i < options.injectables.length; i++) {
      const paramTypes = Reflection.getParamTypes(options.injectables[i]);
      const injectableNode = options.injectables[i].name;
      this.graph.addNode(`injectable:${injectableNode}`, options.injectables[i]);

      if (Array.isArray(paramTypes)) {
        for (let j = 0; j < paramTypes.length; j++) {
          this.graph.addNode(`injectable:${paramTypes[j].name}`, paramTypes[j]);
          this.graph.addDependency(
            `injectable:${injectableNode}`,
            `injectable:${paramTypes[j].name}`
          );
        }
      }

      this.graph.addDependency(node, `injectable:${injectableNode}`);
    }
  }
}
