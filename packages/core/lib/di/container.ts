import {
  INJECTABLE_OPTIONS_METADATA,
  InjectableOptions,
  Logger,
  MODULE_OPTIONS_METADATA,
  ModuleOptions,
  Type,
} from '@hornts/common';
import { DepGraph } from 'dependency-graph';

import { Registry } from './registry';

export class ApplicationContainer {
  private graph: DepGraph<Type<any>>;

  private readonly registry: Registry;

  constructor(private readonly rootModule: Type<any>, private readonly logger?: Logger) {
    this.registry = new Registry();
    this.graph = new DepGraph();
  }

  public initialize() {
    this.load();

    this.instantiateDependencies();

    this.logger?.info('Application container started.');
  }

  private instantiateDependencies() {
    this.logger?.info('Instantiating dependencies...');
  }

  private load() {
    this.logger?.info('Loading dependency graph...');

    const rootOptions = this.getModuleOptions(this.rootModule);

    this.loadInjectables(rootOptions);
  }

  private loadInjectables(options: ModuleOptions) {
    for (let i = 0; i < options.injectables.length; i++) {
      const paramTypes = this.getParamTypes(options.injectables[i]);
      console.log('paramTypes: ', paramTypes);
    }
  }

  private getModuleOptions<T>(constructor: Type<T>): ModuleOptions {
    const meta = Reflect.getOwnMetadata(MODULE_OPTIONS_METADATA, constructor);

    return {
      imports: [],
      controllers: [],
      injectables: [],
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
