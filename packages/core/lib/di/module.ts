import { ModuleOptions, Type } from '@hornts/common';

import { Reflection } from './reflection';
import { Wrapper } from './wrapper';

/**
 * Represents application module.
 */
export class Module extends Wrapper<ModuleOptions> {
  constructor(private readonly ref: Type<any>) {
    super(`module:${ref.name}`, Reflection.getModuleOptions(ref));
  }
}
