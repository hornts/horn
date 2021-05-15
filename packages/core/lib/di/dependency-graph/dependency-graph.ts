import { Type } from '@hornts/common';
import { DepGraph, DepGraphCycleError } from 'dependency-graph';

import { CircularDependencyError } from '../../errors';
import { BasicInjectable, Injectable } from '../injectable';
import { Module } from '../module';

export class DependencyGraph {
  private readonly graph: DepGraph<BasicInjectable<any>>;

  constructor() {
    this.graph = new DepGraph<BasicInjectable<any>>();
  }

  public build(ref: Type<any>) {
    this.loadModuleDependencies(ref);
  }

  public getLoadOrder(): string[] {
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

  public getNode(token: string): BasicInjectable<any> | string {
    return this.graph.getNodeData(token);
  }

  private loadModuleDependencies(ref: Type<any>) {
    const module = new Module(ref);

    const token = module.getToken();
    const meta = module.getMeta();

    this.graph.addNode(token);

    this.loadInjectables(token, meta.injectables);

    for (let index = 0; index < meta.imports.length; index++) {
      const importedModuleToken = `module:${meta.imports[index].name}`;

      if (!this.graph.hasNode(importedModuleToken)) {
        this.loadModuleDependencies(meta.imports[index]);
      }

      this.graph.addDependency(token, importedModuleToken);
    }
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
