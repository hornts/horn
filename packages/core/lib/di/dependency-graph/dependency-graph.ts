import { Type } from '@hornts/common';
import { DepGraph, DepGraphCycleError } from 'dependency-graph';

import { CircularDependencyError } from '../../errors';
import { BasicInjectable, Injectable } from '../injectable';
import { Module } from '../module';
import { Node } from './node';

export class DependencyGraph {
  private readonly graph: DepGraph<Node<any>>;
  // private readonly graph: DepGraph<BasicInjectable<any>>;

  constructor() {
    this.graph = new DepGraph<Node<any>>();
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

  public getNodeData(token: string): BasicInjectable<any> | Module {
    const node = this.graph.getNodeData(token);

    return node.getData();
  }

  private loadModuleDependencies(ref: Type<any>) {
    const module = new Module(ref);

    const token = module.getToken();
    const meta = module.getMeta();

    this.graph.addNode(token, new Node(module));

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
        this.graph.addNode(token, new Node(injectable));
        this.loadInjectables(token, injectable.getDependencies());
      }

      this.graph.addDependency(rootToken, token);
    }
  }
}
