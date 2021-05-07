import { Logger, ModuleOptions, Type } from '@hornts/common';
import { DepGraph } from 'dependency-graph';

import { Instance } from './instance';
import { Module } from './module';
import { Reflection } from './reflection';
import { Registry } from './registry';

/**
 * Application DI container.
 */
export class ApplicationContainer {
  private graph: DepGraph<Instance>;

  private readonly registry: Registry;

  private readonly modules = new Map<string, Module>();

  constructor(private readonly rootModule: Type<any>, private readonly logger?: Logger) {
    this.registry = new Registry();
    this.graph = new DepGraph();
  }

  /**
   * Inits application container.
   */
  public initialise() {
    this.logger?.info('Loading dependency graph...');
    this.loadModuleDependencies(this.rootModule);

    this.logger?.info('Instantiating dependencies...');
    this.instantiateDependencies(this.rootModule);

    this.logger?.info('Application container started.');
  }

  private instantiateDependencies(ref: Type<any>) {
    // Check for cycling, throw error if cycle exists.
    const tokens = this.graph.overallOrder();

    for (let index = 0; index < tokens.length; index++) {
      this.logger?.info(`Instantiating ${tokens[index].split(':')[1]}`);
    }
  }

  private loadModuleDependencies(ref: Type<any>): string {
    const meta = Reflection.getModuleOptions(ref);

    const moduleToken = `module:${ref.name}`;

    this.logger?.info(`Loading ${moduleToken}`);

    this.graph.addNode(moduleToken, new Instance(ref, meta));

    this.loadModuleInjectables(moduleToken, meta);

    if (Array.isArray(meta.imports)) {
      for (let index = 0; index < meta.imports.length; index++) {
        const token = this.loadModuleDependencies(meta.imports[index]);
        this.graph.addDependency(moduleToken, token);
      }
    }

    return moduleToken;
  }

  private loadModuleInjectables(node: string, { injectables }: ModuleOptions) {
    if (Array.isArray(injectables)) {
      for (let index = 0; index < injectables.length; index++) {
        const injectableToken = `injectable:${injectables[index].name}`;

        this.graph.addNode(injectableToken, new Instance(injectables[index]));
        this.graph.addDependency(node, injectableToken);

        this.loadInjectableParams(injectableToken, injectables[index]);
      }
    }
  }

  private loadInjectableParams(node: string, ref: Type<any>) {
    const params = Reflection.getParamTypes(ref);

    if (Array.isArray(params)) {
      for (let index = 0; index < params.length; index++) {
        const injectableToken = `injectable:${params[index].name}`;
        this.graph.addNode(injectableToken, params[index]);
        this.graph.addDependency(node, injectableToken);
        this.loadInjectableParams(injectableToken, params[index]);
      }
    }
  }
}
