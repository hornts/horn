import 'reflect-metadata';

import { CONTROLLER_METHOD_METADATA } from '../../../../constants';
import { HTTPMethodOptions } from '../../../../interfaces';

/**
 * Controller GET method decorator.
 */
export function Get(options: Partial<HTTPMethodOptions>): MethodDecorator {
  return (target: any) => {
    Reflect.defineMetadata(CONTROLLER_METHOD_METADATA, options, target);
  };
}
