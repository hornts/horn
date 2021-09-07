import {
  CONTROLLER_OPTIONS_METADATA,
  ControllerOptions,
  DI_METADATA,
  DIMeta,
  INJECTABLE_OPTIONS_METADATA,
  InjectableOptions,
  MODULE_OPTIONS_METADATA,
  ModuleOptions,
  Scope,
  Type,
} from '@hornts/common';

/**
 * Sugar over Reflect API.
 */
export class Reflection {
  public static getDIMeta<T>(constructor: Type<T>): DIMeta {
    return Reflect.getOwnMetadata(DI_METADATA, constructor);
  }

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
    const meta = Reflect.getOwnMetadata(INJECTABLE_OPTIONS_METADATA, constructor);

    return {
      scope: Scope.SINGLETON,
      ...meta,
    };
  }

  /**
   * Returns controller options.
   */
  public static getControllerOptions<T>(constructor: Type<T>): ControllerOptions {
    const meta = Reflect.getOwnMetadata(CONTROLLER_OPTIONS_METADATA, constructor);

    return {
      scope: Scope.SINGLETON,
      ...meta,
    };
  }

  /**
   * Returns constructor parameters.
   */
  public static getParamTypes<T>(constructor: Type<T>): Type<any>[] {
    return Reflect.getOwnMetadata('design:paramtypes', constructor) || [];
  }
}
