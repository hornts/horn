import 'reflect-metadata';

import * as uuid from 'uuid';

import { DI_META, INJECTABLE_OPTIONS_METADATA } from '../../../../constants';
import { InjectableOptions, Scope } from '../../../../interfaces';

/**
 * Injectable decorator.
 */
export function Injectable(
  options: InjectableOptions = { scope: Scope.SINGLETON }
): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(INJECTABLE_OPTIONS_METADATA, options, target);
    Reflect.defineMetadata(DI_META, { token: uuid.v4() }, target);
  };
}
