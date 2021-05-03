import { Logger, Type } from '@hornts/common';

import { Injector } from './injector';

export class AppContainer {
  private readonly logger: Logger;

  private readonly injector: Injector;

  constructor(private readonly rootModule: Type<any>) {
    this.logger = new Logger({
      name: 'Horn',
      prettyPrint: {
        colorize: true,
        ignore: 'pid,hostname,time',
      },
    });

    this.injector = new Injector();
  }

  public load() {
    this.logger.info('Loading dependency tree...');
  }
}
