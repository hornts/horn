import { Type } from '../type.interface';

export interface ModuleOptions {
  imports?: Type<any>[];
  controllers?: Type<any>[];
  providers?: Type<any>[];
  exports?: Type<any>[];
}
