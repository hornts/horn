import 'reflect-metadata';

import { INJECTABLE_OPTIONS_METADATA } from '../../../constants';
import { InjectableOptions, Scope } from '../../../interfaces';

/**
 * Injectable decorator.
 */
export function Injectable(options: InjectableOptions = {}): ClassDecorator {
  if (!options.scope) {
    // eslint-disable-next-line no-param-reassign
    options.scope = Scope.SINGLETON;
  }

  return (target: any) => {
    Reflect.defineMetadata(INJECTABLE_OPTIONS_METADATA, options, target);
  };
}
