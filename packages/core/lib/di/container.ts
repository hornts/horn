import { Logger, ModuleOptions, Type } from '@hornts/common';
import { DepGraph } from 'dependency-graph';

import { ModuleAlreadyExistsError } from '../errors';
import { Instance } from './instance';
import { Module } from './module';
import { ModuleContainer } from './module-container';
import { Registry } from './registry';

/**
 * Application DI container.
 */
export class ApplicationContainer {
  private readonly moduleContainer: ModuleContainer;

  private graph: DepGraph<Instance>;

  private readonly registry: Registry;

  constructor(private readonly rootModule: Type<any>, private readonly logger?: Logger) {
    this.moduleContainer = new ModuleContainer();
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
    this.instantiateDependencies();

    this.logger?.info('Application container started.');
  }

  private instantiateDependencies() {
    // Also check for cycling, throws error if cycle exists.
    const tokens = this.graph.overallOrder();

    for (let index = 0; index < tokens.length; index++) {
      this.logger?.debug(`Instantiating ${tokens[index]}`);
      if (!tokens[index].startsWith('module:')) {
        const node = this.graph.getNodeData(tokens[index]);

        const instance = node.instantiate();

        this.registry.set(Symbol(node.getToken()), instance);
      }
    }
  }

  private loadModuleDependencies(ref: Type<any>): Module {
    const module = new Module(ref);

    const token = module.getToken();
    const meta = module.getMeta();

    this.moduleContainer.set(module);

    this.logger?.info(`Loading ${token}`);

    this.graph.addNode(token);

    this.loadModuleInjectables(module, meta);

    if (Array.isArray(meta.imports)) {
      for (let index = 0; index < meta.imports.length; index++) {
        let importedModule: Module;

        try {
          importedModule = this.loadModuleDependencies(meta.imports[index]);
        } catch (error) {
          if (error instanceof ModuleAlreadyExistsError) {
            importedModule = this.moduleContainer.get(`module:${meta.imports[index].name}`);
          } else {
            throw error;
          }
        }

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

        if (!this.graph.hasNode(token)) {
          this.graph.addNode(token, injectable);
          this.loadInjectableParams(injectable);
        }

        this.graph.addDependency(module.getToken(), token);
      }
    }
  }

  private loadInjectableParams(injectable: Instance) {
    const dependencies = injectable.getDependencies();

    for (let index = 0; index < dependencies.length; index++) {
      const dependency = new Instance(dependencies[index]);
      const dependencyToken = dependency.getToken();

      if (!this.graph.hasNode(dependencyToken)) {
        this.graph.addNode(dependencyToken, dependency);
        this.loadInjectableParams(dependency);
      }

      this.graph.addDependency(injectable.getToken(), dependencyToken);
    }
  }
}
