import { Logger, Type } from '@hornts/common';

import { ResolveDependencyError } from '../errors';
import { GraphBuilder } from './graph-builder';
import { Injectable } from './injectable';
import { Registry } from './registry';

/**
 * Application DI container.
 */
export class ApplicationContainer {
  private readonly registry: Registry;

  private readonly graph: GraphBuilder;

  constructor(private readonly rootModule: Type<any>, private readonly logger?: Logger) {
    this.registry = new Registry();
    this.graph = new GraphBuilder();
  }

  /**
   * Inits application container.
   */
  public initialise() {
    this.logger?.info('Loading dependency graph...');
    this.graph.build(this.rootModule);

    this.logger?.info('Instantiating dependencies...');
    this.instantiateDependencies();

    this.logger?.info('Application container started.');
  }

  private instantiateDependencies() {
    const tokens = this.graph.getOverallOrder();

    for (let index = 0; index < tokens.length; index++) {
      this.logger?.debug(`Instantiating ${tokens[index]}`);

      const node = this.graph.getNodeData(tokens[index]);

      if (node instanceof Injectable) {
        const dependenciesRefs = node.getDependencies();
        const dependencies = [];
        for (let i = 0; i < dependenciesRefs.length; i++) {
          const token = `injectable:${dependenciesRefs[i].name}`;
          const dependency = this.registry.get(token);

          if (!dependency) {
            throw new ResolveDependencyError(token, node.getToken());
          }

          dependencies.push(dependency);
        }

        const instance = node.instantiate(dependencies);

        this.registry.set(node.getToken(), instance);
      }
    }
  }
}
