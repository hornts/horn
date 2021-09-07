import 'reflect-metadata';

import { CONTROLLER_METHOD_METADATA } from '../../../../constants';
import { HTTPMethodOptions, HTTPMethodType } from '../../../../interfaces';

/**
 * Controller GET method decorator.
 */
export function Get(path?: string): MethodDecorator {
  const options: HTTPMethodOptions = {
    path: path || '/',
    type: HTTPMethodType.GET,
  };

  return (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.defineMetadata(CONTROLLER_METHOD_METADATA, options, descriptor.value);
  };
}
