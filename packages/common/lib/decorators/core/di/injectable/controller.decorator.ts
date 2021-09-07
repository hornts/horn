import 'reflect-metadata';

import * as uuid from 'uuid';

import { CONTROLLER_OPTIONS_METADATA, DI_METADATA } from '../../../../constants';
import { ControllerOptions, Scope } from '../../../../interfaces';

/**
 * Controller decorator.
 */
export function Controller(
  options: ControllerOptions = { scope: Scope.SINGLETON }
): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(CONTROLLER_OPTIONS_METADATA, options, target);
    Reflect.defineMetadata(DI_METADATA, { token: uuid.v4() }, target);
  };
}
