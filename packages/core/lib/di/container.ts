import {
  INJECTABLE_OPTIONS_METADATA,
  InjectableOptions,
  Logger,
  MODULE_OPTIONS_METADATA,
  ModuleOptions,
  Type,
} from '@hornts/common';

import { Registry } from './registry';

export class ApplicationContainer {
  private readonly logger: Logger;

  private readonly registry: Registry;

  constructor(private readonly rootModule: Type<any>) {
    this.logger = new Logger({
      name: 'Horn',
      prettyPrint: {
        colorize: true,
        ignore: 'pid,hostname,time',
      },
    });

    this.registry = new Registry();
  }

  public initialize() {
    this.load();

    this.instantiateDependencies();
  }

  private instantiateDependencies() {
    this.logger.info('Instantiating dependencies...');
  }

  private load() {
    this.logger.info('Loading dependency tree...');

    const rootOptions = this.getModuleOptions(this.rootModule);

    this.loadProviders(rootOptions);
  }

  private loadProviders(options: ModuleOptions) {
    for (let i = 0; i < options.providers.length; i++) {
      const paramTypes = this.getParamTypes(options.providers[i]);
      console.log('paramTypes: ', paramTypes);
    }
  }

  private getModuleOptions<T>(constructor: Type<T>): ModuleOptions {
    const meta = Reflect.getOwnMetadata(MODULE_OPTIONS_METADATA, constructor);

    return {
      imports: [],
      controllers: [],
      providers: [],
      exports: [],
      ...meta,
    };
  }

  private getInjectableOptions<T>(constructor: Type<T>): InjectableOptions {
    return Reflect.getOwnMetadata(INJECTABLE_OPTIONS_METADATA, constructor);
  }

  private getParamTypes<T>(constructor: Type<T>): undefined | any[] {
    return Reflect.getOwnMetadata('design:paramtypes', constructor);
  }
}
