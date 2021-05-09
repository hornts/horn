import 'reflect-metadata';

import { INJECT_TOKEN_METADATA } from '../../../constants';

/**
 * Injectable decorator.
 */
export function Inject(token: string): ParameterDecorator {
  return (target: any) => {
    Reflect.defineMetadata(INJECT_TOKEN_METADATA, token, target);
  };
}
