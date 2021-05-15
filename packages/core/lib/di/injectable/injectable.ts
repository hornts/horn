import { InjectableOptions, Type } from '@hornts/common';

import { Reflection } from '../reflection';
import { BasicInjectable } from './basic-injectable';

export class Injectable extends BasicInjectable<InjectableOptions> {
  constructor(ref: Type<any>) {
    super(ref, `injectable:${ref.name}`, Reflection.getInjectableOptions(ref));
  }
}
