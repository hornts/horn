import 'reflect-metadata';

import * as uuid from 'uuid';

import { CONTROLLER_OPTIONS_METADATA, DI_METADATA } from '../../../../constants';
import { ControllerOptions, Scope } from '../../../../interfaces';

/**
 * Controller decorator.
 */
export function Controller(options: ControllerOptions | string): ClassDecorator {
  return (target: any) => {
    let controllerOptions = options;

    if (typeof options === 'string') {
      controllerOptions = {
        scope: Scope.SINGLETON,
        path: options,
      };
    }

    Reflect.defineMetadata(CONTROLLER_OPTIONS_METADATA, controllerOptions, target);
    Reflect.defineMetadata(DI_METADATA, { token: uuid.v4() }, target);
  };
}
