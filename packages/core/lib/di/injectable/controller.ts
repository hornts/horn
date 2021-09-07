import { ControllerOptions, Type } from '@hornts/common';

import { Reflection } from '../reflection';
import { BasicInjectable } from './basic-injectable';

export class Controller extends BasicInjectable<ControllerOptions> {
  constructor(ref: Type<any>) {
    super(ref, Reflection.getControllerOptions(ref));
  }

  public getPath(): string {
    return this.meta.path;
  }
}
