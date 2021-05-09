import { ModuleAlreadyExistsError } from '../../errors';
import { Module } from '../module';

/**
 * Container for application modules.
 */
export class ModuleContainer {
  private readonly container = new Map<string, Module>();

  constructor() {}

  public get(token: string): Module | undefined {
    return this.container.get(token);
  }

  public set(module: Module) {
    const token = module.getToken();

    if (this.get(token)) {
      throw new ModuleAlreadyExistsError(token);
    }

    this.container.set(token, module);
  }
}
