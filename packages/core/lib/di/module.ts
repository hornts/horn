import { DIMeta, ModuleOptions, Type } from '@hornts/common';

import { Reflection } from './reflection';

export class Module {
  private readonly name: string;

  private readonly diMeta: DIMeta;

  private readonly meta: ModuleOptions;

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
}
