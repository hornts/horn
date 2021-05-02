import 'reflect-metadata';

import { InjectableOptions, Scope } from '../../interfaces';

export function Injectable(options: InjectableOptions = {}): ClassDecorator {
  if (!options.scope) {
    // eslint-disable-next-line no-param-reassign
    options.scope = Scope.SINGLETON;
  }

  return (target: any) => {
    Reflect.defineMetadata('horn:injectable', options, target);
  };
}
