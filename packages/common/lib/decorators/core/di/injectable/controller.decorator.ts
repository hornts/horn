import 'reflect-metadata';

import { CONTROLLER_OPTIONS_METADATA } from '../../../../constants';
import { ControllerOptions } from '../../../../interfaces';

/**
 * Controller decorator.
 */
export function Controller(options: ControllerOptions): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(CONTROLLER_OPTIONS_METADATA, options, target);
  };
}
