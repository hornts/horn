import 'reflect-metadata';

import { INJECTABLE_OPTIONS_METADATA } from '../../../../constants';
import { InjectableOptions } from '../../../../interfaces';

/**
 * Injectable decorator.
 */
export function Injectable(options: InjectableOptions = {}): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(INJECTABLE_OPTIONS_METADATA, options, target);
  };
}
