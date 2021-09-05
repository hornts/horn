import { ModuleOptions, Type } from '@hornts/common';
import * as uuid from 'uuid';

import { Reflection } from './reflection';

export class Module {
  private readonly name: string;

  private readonly token: string;

  private readonly meta: ModuleOptions;

  constructor(private readonly ref: Type<any>) {
    this.name = ref.name;
    this.token = uuid.v4();
    this.meta = Reflection.getModuleOptions(ref);
  }

  public getName() {
    return this.name;
  }

  public getToken() {
    return this.token;
  }

  public getMeta(): ModuleOptions {
    return this.meta;
  }

  public getRef(): Type<any> {
    return this.ref;
  }
}
