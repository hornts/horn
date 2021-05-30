import { ModuleOptions, Type } from '@hornts/common';

import { ResolveDependencyError } from '../errors';
import { Injectable } from './injectable';
import { Reflection } from './reflection';

export class Module {
  private readonly token: string;

  private readonly meta: ModuleOptions;

  private readonly injectables = new Map<string, any>();

  private readonly imports = new Map<string, Module>();

  constructor(private readonly ref: Type<any>) {
    this.token = `module:${ref.name}`;
    this.meta = Reflection.getModuleOptions(ref);
  }

  public getToken(): string {
    return this.token;
  }

  public getMeta(): ModuleOptions {
    return this.meta;
  }

  public getRef(): Type<any> {
    return this.ref;
  }

  public setImport(token: string, module: any) {
    this.imports.set(token, module);
  }

  public getImport(token: string): Module | undefined {
    return this.imports.get(token);
  }

  public loadInjectableInstance(injectable: Injectable): any {
    const token = injectable.getToken();
    let instance = this.injectables.get(token);

    if (!instance && this.isInjectableImported(token)) {
      const injectables = [];
      const dependencies = injectable.getDependencies();
      for (let index = 0; index < dependencies.length; index++) {
        const injectable = new Injectable(dependencies[index]);
        const instance = this.loadInjectableInstance(injectable);

        injectables.push(instance);
      }

      instance = injectable.instantiate(injectables);
    } else if (!instance) {
      // Trying to laod injectable from imported modules

      // eslint-disable-next-line no-restricted-syntax
      for (const [, module] of this.imports.entries()) {
        instance = module.loadInjectableInstance(injectable);
        if (instance && module.isInjectableExported(token)) {
          return instance;
        }
      }

      throw new ResolveDependencyError(this.token, token);
    }

    this.setInjectable(token, instance);

    return instance;
  }

  public setInjectable(token: string, injectable: any) {
    this.injectables.set(token, injectable);
  }

  public isInjectableExported(token: string): boolean {
    const injectable = this.injectables.get(token);

    for (let index = 0; index < this.meta.exports.length; index++) {
      if (injectable instanceof this.meta.exports[index]) {
        return true;
      }
    }

    return false;
  }

  private isInjectableImported(token: string): boolean {
    const { injectables } = this.meta;

    for (let index = 0; index < injectables.length; index++) {
      if (injectables[index].name === token.split('injectable:')[1]) {
        return true;
      }
    }

    return false;
  }
}
