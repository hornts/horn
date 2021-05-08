import { Logger, Type } from '@hornts/common';
import { DepGraph, DepGraphCycleError } from 'dependency-graph';

import { CircularDependencyError, ModuleAlreadyExistsError } from '../errors';
import { Injectable } from './injectable';
import { Module } from './module';
import { ModuleContainer } from './module-container';
import { Registry } from './registry';

/**
 * Application DI container.
 */
export class ApplicationContainer {
  private readonly moduleContainer: ModuleContainer;

  private graph: DepGraph<Injectable>;

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

    console.log(this.registry);

    this.logger?.info('Application container started.');
  }

  private instantiateDependencies() {
    let tokens = [];

    // Also check for cycling, throws error if cycle exists.
    try {
      tokens = this.graph.overallOrder();
    } catch (error) {
      if (error instanceof DepGraphCycleError) {
        throw new CircularDependencyError(error.message);
      } else {
        throw error;
      }
    }

    for (let index = 0; index < tokens.length; index++) {
      this.logger?.debug(`Instantiating ${tokens[index]}`);
      if (!tokens[index].startsWith('module:')) {
        const node = this.graph.getNodeData(tokens[index]);

        const dependenciesRefs = node.getDependencies();
        const dependencies = [];
        for (let i = 0; i < dependenciesRefs.length; i++) {
          const dep = this.registry.get(`injectable:${dependenciesRefs[i].name}`);
          dependencies.push(dep);
        }

        const instance = node.instantiate(dependencies);

        this.registry.set(node.getToken(), instance);
      }
    }
  }

  private loadModuleDependencies(ref: Type<any>): Module {
    const module = new Module(ref);

    const token = module.getToken();
    const meta = module.getMeta();

    this.moduleContainer.set(module);

    this.logger?.debug(`Loading ${token}`);

    this.graph.addNode(token);

    this.loadInjectables(token, meta.injectables);

    if (Array.isArray(meta.imports)) {
      for (let index = 0; index < meta.imports.length; index++) {
        let importedModule: Module;

        try {
          importedModule = this.loadModuleDependencies(meta.imports[index]);
        } catch (error) {
          if (error instanceof ModuleAlreadyExistsError) {
            // TODO: dont like this string template
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

  private loadInjectables(rootToken: string, injectables: Type<any>[]) {
    for (let index = 0; index < injectables.length; index++) {
      const injectable = new Injectable(injectables[index]);
      const token = injectable.getToken();

      if (!this.graph.hasNode(token)) {
        this.graph.addNode(token, injectable);
        this.loadInjectables(token, injectable.getDependencies());
      }

      this.graph.addDependency(rootToken, token);
    }
  }
}
