import { Type } from '@hornts/common';
import { DepGraph, DepGraphCycleError } from 'dependency-graph';

import { CircularDependencyError, ModuleAlreadyExistsError } from '../../errors';
import { Injectable } from '../injectable';
import { Module } from '../module';
import { ModuleContainer } from '../module-container';
import { Wrapper } from '../wrapper';

export class GraphBuilder {
  private readonly graph: DepGraph<Wrapper<any>>;

  private readonly moduleContainer: ModuleContainer;

  constructor() {
    this.graph = new DepGraph<Wrapper<any>>();
    this.moduleContainer = new ModuleContainer();
  }

  public build(ref: Type<any>) {
    this.loadModuleDependencies(ref);
  }

  public getOverallOrder(): string[] {
    try {
      return this.graph.overallOrder();
    } catch (error) {
      if (error instanceof DepGraphCycleError) {
        throw new CircularDependencyError(error.message);
      } else {
        throw error;
      }
    }
  }

  public getNodeData(token: string): Wrapper<any> {
    return this.graph.getNodeData(token);
  }

  private loadModuleDependencies(ref: Type<any>): Module {
    const module = new Module(ref);

    const token = module.getToken();
    const meta = module.getMeta();

    this.moduleContainer.set(module);

    this.graph.addNode(token);

    this.loadInjectables(token, meta.injectables);

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
