import { Type } from '../type.interface';

export interface ModuleOptions {
  imports?: ModuleOptions[];
  controllers?: Type<any>[];
  providers?: Type<any>[];
  exports?: Type<any>[];
}
