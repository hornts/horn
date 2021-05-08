import 'reflect-metadata';

import { MODULE_OPTIONS_METADATA } from '../../../constants';
import { ModuleOptions } from '../../../interfaces';

/**
 * Module decorator.
 */
export function Module(options: ModuleOptions = {}): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(MODULE_OPTIONS_METADATA, options, target);
  };
}
