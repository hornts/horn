import { ModuleAlreadyExists } from '../errors';
import { Module } from './module';

export class ModuleContainer {
  private readonly container = new Map<string, Module>();

  constructor() {}

  public get(token: string): Module | undefined {
    return this.container.get(token);
  }

  public set(token: string, module: Module) {
    if (this.get(token)) {
      throw new ModuleAlreadyExists(token);
    }

    this.container.set(token, module);
  }
}
