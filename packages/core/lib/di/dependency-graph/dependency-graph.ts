import { ModuleOptions, Type } from '@hornts/common';
import { DepGraph } from 'dependency-graph';

import { Controller, Injectable } from '../injectable';
import { Module } from '../module';
import { Node } from './node';

export class DependencyGraph {
  private readonly graph: DepGraph<Node<any>>;

  constructor() {
    this.graph = new DepGraph<Node<any>>();
  }

  public build(ref: Type<any>) {
    this.loadDependencies(ref);
  }

  private loadDependencies(ref: Type<any>) {
    const module = new Module(ref);

    const token = module.getToken();
    const meta = module.getMeta();

    this.graph.addNode(token, new Node(module));

    this.loadInjectables(token, meta);
    this.loadControllers(token, meta);

    for (let index = 0; index < meta.imports.length; index++) {
      this.loadDependencies(meta.imports[index]);
    }
  }

  private loadInjectables(rootToken: string, { injectables }: ModuleOptions) {
    for (let index = 0; index < injectables.length; index++) {
      const injectable = new Injectable(injectables[index]);

      const token = injectable.getToken();

      this.graph.addNode(token, new Node(injectable));
      this.graph.addDependency(rootToken, token);
    }
  }

  private loadControllers(rootToken: string, { controllers }: ModuleOptions) {
    for (let index = 0; index < controllers.length; index++) {
      const controller = new Controller(controllers[index]);

      const token = controller.getToken();

      this.graph.addNode(token, new Node(controller));
      this.graph.addDependency(rootToken, token);
    }
  }
}
