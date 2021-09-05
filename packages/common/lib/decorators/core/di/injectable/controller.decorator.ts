import 'reflect-metadata';

import * as uuid from 'uuid';

import { CONTROLLER_OPTIONS_METADATA, DI_META } from '../../../../constants';
import { ControllerOptions } from '../../../../interfaces';

/**
 * Controller decorator.
 */
export function Controller(options: ControllerOptions): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(CONTROLLER_OPTIONS_METADATA, options, target);
    Reflect.defineMetadata(DI_META, { token: uuid.v4() }, target);
  };
}
