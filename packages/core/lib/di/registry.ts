import { Module } from './module';

export class Registry {
  private modules = new Map<string, Module>();

  private injectables = new Map<string, any>();

  constructor() {}

  public getModule(token: string): Module {
    return this.modules.get(token);
  }

  public setModule(token: string, module: Module) {
    this.modules.set(token, module);
  }

  public setInjectable(token: string, injectable: any) {
    this.injectables.set(token, injectable);
  }

  public getInjectable(token: string): any {
    return this.injectables.get(token);
  }
}
