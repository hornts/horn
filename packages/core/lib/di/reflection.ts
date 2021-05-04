import {
  INJECTABLE_OPTIONS_METADATA,
  InjectableOptions,
  MODULE_OPTIONS_METADATA,
  ModuleOptions,
  Type,
} from '@hornts/common';

export class Reflection {
  public static getModuleOptions<T>(constructor: Type<T>): ModuleOptions {
    const meta = Reflect.getOwnMetadata(MODULE_OPTIONS_METADATA, constructor);

    return {
      imports: [],
      controllers: [],
      injectables: [],
      exports: [],
      ...meta,
    };
  }

  public static getInjectableOptions<T>(constructor: Type<T>): InjectableOptions {
    return Reflect.getOwnMetadata(INJECTABLE_OPTIONS_METADATA, constructor);
  }

  public static getParamTypes<T>(constructor: Type<T>): undefined | any[] {
    return Reflect.getOwnMetadata('design:paramtypes', constructor);
  }
}
