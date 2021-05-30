import { ModuleOptions, Type } from '@hornts/common';

import { Reflection } from './reflection';

export class Module {
  private readonly token: string;

  private readonly meta: ModuleOptions;

  private readonly injectables = new Map<string, any>();

  private readonly imports = new Map<string, any>();

  private readonly exports = new Map<string, any>();

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

  public getImport(token: string): any {
    return this.imports.get(token);
  }

  public setExport(token: string, injectable: any) {
    this.exports.set(token, injectable);
  }

  public getExport(token: string): any {
    return this.exports.get(token);
  }

  public setInjectable(token: string, injectable: any) {
    this.injectables.set(token, injectable);
  }

  public getInjectable(token: string): any {
    return this.injectables.get(token);
  }
}
