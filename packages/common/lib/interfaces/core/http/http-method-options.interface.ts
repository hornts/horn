import { HTTPMethodType } from './http-method-type.enum';

export interface HTTPMethodOptions {
  type: HTTPMethodType;
  path: string;
}
