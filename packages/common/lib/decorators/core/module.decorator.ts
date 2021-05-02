import 'reflect-metadata';

import { ModuleOptions } from '../../interfaces';

export function Module(options: ModuleOptions = {}): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('horn:module', options, target);
  };
}
