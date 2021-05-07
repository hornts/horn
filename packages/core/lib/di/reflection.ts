import {
  INJECTABLE_OPTIONS_METADATA,
  InjectableOptions,
  MODULE_OPTIONS_METADATA,
  ModuleOptions,
  Type,
} from '@hornts/common';

/**
 * Sugar over Reflect API.
 */
export class Reflection {
  /**
   * Returns module options.
   */
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

  /**
   * Returns injectable options.
   */
  public static getInjectableOptions<T>(constructor: Type<T>): InjectableOptions {
    return Reflect.getOwnMetadata(INJECTABLE_OPTIONS_METADATA, constructor);
  }

  /**
   * Returns constructor parameters.
   */
  public static getParamTypes<T>(constructor: Type<T>): any[] {
    return Reflect.getOwnMetadata('design:paramtypes', constructor) || [];
  }
}
