import { BasicInjectableOptions } from './basic-injectable-options.inteface';

export interface ControllerOptions extends BasicInjectableOptions {
  path: string;
}
