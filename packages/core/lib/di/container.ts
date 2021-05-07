import { Logger, ModuleOptions, Type } from '@hornts/common';
import { DepGraph } from 'dependency-graph';

import { Instance } from './instance';
import { Module } from './module';
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
      this.logger?.info(`Instantiating ${tokens[index]}`);
    }
  }

  private loadModuleDependencies(ref: Type<any>): Module {
    const module = new Module(ref);

    const token = module.getToken();
    const meta = module.getMeta();

    this.logger?.info(`Loading ${token}`);

    this.graph.addNode(token);

    this.loadModuleInjectables(module, meta);

    if (Array.isArray(meta.imports)) {
      for (let index = 0; index < meta.imports.length; index++) {
        const importedModule = this.loadModuleDependencies(meta.imports[index]);
        this.graph.addDependency(token, importedModule.getToken());
      }
    }

    return module;
  }

  private loadModuleInjectables(module: Module, { injectables }: ModuleOptions) {
    if (Array.isArray(injectables)) {
      for (let index = 0; index < injectables.length; index++) {
        const injectable = new Instance(injectables[index]);
        const token = injectable.getToken();

        this.graph.addNode(token, injectable);
        this.graph.addDependency(module.getToken(), token);

        this.loadInjectableParams(injectable);
      }
    }
  }

  private loadInjectableParams(injectable: Instance) {
    const dependencies = injectable.getDependencies();

    for (let index = 0; index < dependencies.length; index++) {
      const dependency = new Instance(dependencies[index]);
      const dependencyToken = dependency.getToken();

      this.graph.addNode(dependencyToken, dependency);
      this.graph.addDependency(injectable.getToken(), dependencyToken);
      this.loadInjectableParams(dependency);
    }
  }
}
