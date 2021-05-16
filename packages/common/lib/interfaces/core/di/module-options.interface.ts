import { Type } from '../../type.interface';

export interface ModuleOptions {
  imports?: Type<any>[];
  controllers?: Type<any>[];
  injectables?: Type<any>[];
  exports?: Type<any>[];
}
