import { Type } from '@hornts/common';
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

    this.loadInjectables(token, meta.injectables);
    this.loadControllers(token, meta.controllers);

    for (let index = 0; index < meta.imports.length; index++) {
      const importedModuleToken = this.extractModuleToken(meta.imports[index]);

      if (!this.graph.hasNode(importedModuleToken)) {
        this.loadDependencies(meta.imports[index]);
      }

      this.graph.addDependency(token, importedModuleToken);
    }
  }

  private loadInjectables(rootToken: string, injectables: Type<any>[]) {
    for (let index = 0; index < injectables.length; index++) {
      const injectable = new Injectable(injectables[index]);

      const token = injectable.getToken();

      if (!this.hasInjectable(injectables[index])) {
        this.graph.addNode(token, new Node(injectable));
        this.loadInjectables(token, injectable.getDependencies());
      }

      this.graph.addDependency(rootToken, token);
    }
  }

  private loadControllers(rootToken: string, controllers: Type<any>[]) {
    for (let index = 0; index < controllers.length; index++) {
      const controller = new Controller(controllers[index]);

      const token = controller.getToken();

      if (!this.hasController(controllers[index])) {
        this.graph.addNode(token, new Node(controller));
        this.loadInjectables(token, controller.getDependencies());
      }

      this.graph.addDependency(rootToken, token);
    }
  }

  private extractModuleToken(ref: Type<any>): string {
    const module = new Module(ref);

    return module.getToken();
  }

  private hasInjectable(ref: Type<any>): boolean {
    const injectable = new Injectable(ref);
    const token = injectable.getToken();

    return this.graph.hasNode(token);
  }

  private hasController(ref: Type<any>): boolean {
    const controller = new Controller(ref);
    const token = controller.getToken();

    return this.graph.hasNode(token);
  }
}
