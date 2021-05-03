import { Logger, MODULE_OPTIONS_METADATA, ModuleOptions, Type } from '@hornts/common';

export class ApplicationContainer {
  private readonly logger: Logger;

  private readonly modules = new Map<string, any>();

  constructor(private readonly rootModule: Type<any>) {
    this.logger = new Logger({
      name: 'Horn',
      prettyPrint: {
        colorize: true,
        ignore: 'pid,hostname,time',
      },
    });
  }

  public load() {
    this.logger.info('Loading dependency tree...');
  }

  private getModuleOptions<T>(constructor: Type<T>): ModuleOptions {
    return Reflect.getOwnMetadata(MODULE_OPTIONS_METADATA, constructor);
  }
}
