import 'reflect-metadata';

import * as uuid from 'uuid';

import { DI_METADATA, MODULE_OPTIONS_METADATA } from '../../../constants';
import { ModuleOptions } from '../../../interfaces';

/**
 * Module decorator.
 */
export function Module(options: ModuleOptions = {}): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(MODULE_OPTIONS_METADATA, options, target);
    Reflect.defineMetadata(DI_METADATA, { token: uuid.v4() }, target);
  };
}
