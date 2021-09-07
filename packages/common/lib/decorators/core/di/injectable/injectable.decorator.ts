import 'reflect-metadata';

import * as uuid from 'uuid';

import { DI_METADATA, INJECTABLE_OPTIONS_METADATA } from '../../../../constants';
import { InjectableOptions, Scope } from '../../../../interfaces';

/**
 * Injectable decorator.
 */
export function Injectable(
  options: InjectableOptions = { scope: Scope.SINGLETON }
): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(INJECTABLE_OPTIONS_METADATA, options, target);
    Reflect.defineMetadata(DI_METADATA, { token: uuid.v4() }, target);
  };
}
