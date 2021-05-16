import { ModuleOptions, Type } from '@hornts/common';

import { Reflection } from './reflection';

export class Module {
  private readonly token: string;

  private readonly meta: ModuleOptions;

  private readonly injectables: Map<string, Type<any>>;

  constructor(private readonly ref: Type<any>) {
    this.token = `module:${ref.name}`;
    this.meta = Reflection.getModuleOptions(ref);
  }

  public addInjectable(token: string, injectable: Type<any>) {
    this.injectables.set(token, injectable);
  }

  public getToken(): string {
    return this.token;
  }

  public getMeta(): ModuleOptions {
    return this.meta;
  }
}
