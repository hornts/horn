import { DIMeta, ModuleOptions, Type } from '@hornts/common';

import { ResolveDependencyError } from '../errors';
import { Controller, Injectable } from './injectable';
import { Reflection } from './reflection';

export class Module {
  private readonly name: string;

  private readonly diMeta: DIMeta;

  private readonly meta: ModuleOptions;

  private readonly injectables = new Map<string, Injectable>();

  private readonly controllers = new Map<string, Controller>();

  private readonly imports = new Map<string, Module>();

  private readonly exports = new Map<string, Injectable>();

  constructor(private readonly ref: Type<any>) {
    this.name = ref.name;
    this.diMeta = Reflection.getDIMeta(ref);
    this.meta = Reflection.getModuleOptions(ref);
  }

  public getName() {
    return this.name;
  }

  public getToken() {
    return this.diMeta.token;
  }

  public getMeta(): ModuleOptions {
    return this.meta;
  }

  public getRef(): Type<any> {
    return this.ref;
  }

  public setInjectable(injectable: Injectable) {
    this.injectables.set(injectable.getToken(), injectable);

    if (this.meta.exports.includes(injectable.getRef())) {
      this.exports.set(injectable.getToken(), injectable);
    }
  }

  public getInjectable(token: string): Injectable | undefined {
    const injectable = this.injectables.get(token);

    if (injectable && this.exports.has(token)) {
      return injectable;
    }

    return undefined;
  }

  public setController(controller: Controller) {
    this.controllers.set(controller.getToken(), controller);
  }

  public setImport(module: Module) {
    this.imports.set(module.getToken(), module);
  }

  public instantiate() {
    this.instantiateInjectables();
    this.instantiateControllers();
  }

  private instantiateInjectables() {
    // eslint-disable-next-line no-restricted-syntax
    for (const [, injectable] of this.injectables.entries()) {
      const dependencyRefs = injectable.getDependencies();
      const dependencies = [];

      for (let index = 0; index < dependencyRefs.length; index++) {
        const dependency = this.findDepenendency(dependencyRefs[index]);

        if (!dependency) {
          throw new ResolveDependencyError(
            dependencyRefs[index].name,
            injectable.getName(),
            this.name
          );
        }

        dependencies.push(dependency.getInstance());
      }

      injectable.instantiate(dependencies);
    }
  }

  private findDepenendency(dependency: Type<any>): Injectable {
    const { token } = Reflection.getDIMeta(dependency);

    let injectable = this.injectables.get(token);

    if (!injectable) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [, module] of this.imports.entries()) {
        injectable = module.getInjectable(token);
      }
    }

    return injectable;
  }

  private instantiateControllers() {
    // eslint-disable-next-line no-restricted-syntax
    for (const [, controller] of this.controllers.entries()) {
      const dependencyRefs = controller.getDependencies();
      const dependencies = [];

      for (let index = 0; index < dependencyRefs.length; index++) {
        const dependency = this.findDepenendency(dependencyRefs[index]);

        if (!dependency) {
          throw new ResolveDependencyError(
            dependencyRefs[index].name,
            controller.getName(),
            this.name
          );
        }

        dependencies.push(dependency.getInstance());
      }

      controller.instantiate(dependencies);
    }
  }
}
