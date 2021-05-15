import { ModuleOptions, Type } from '@hornts/common';

import { Reflection } from './reflection';

export class Module {
  private readonly token: string;

  private readonly meta: ModuleOptions;

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
}
