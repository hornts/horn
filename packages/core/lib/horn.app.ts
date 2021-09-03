import { Logger, Type } from '@hornts/common';

import { ApplicationContainer } from './di';
import { HttpAdapter } from './http';

export interface HornOptions<T extends HttpAdapter> {
  /**
   * Determines whether the logger is on or off.
   * @default true
   */
  logger?: boolean;

  /**
   * HTTP adapter
   */
  http?: T;
}

export class HornApplication<T extends HttpAdapter> {
  private readonly logger?: Logger;

  private readonly container: ApplicationContainer;

  private readonly http: T;

  constructor(rootModule: Type<any>, options: HornOptions<T> = { logger: true }) {
    if (options.logger) {
      this.logger = new Logger({
        name: 'Horn',
        prettyPrint: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: true,
        },
      });
    }

    this.container = new ApplicationContainer(rootModule, this.logger);
    this.http = options?.http;

    this.container.initialise();
  }

  /**
   * Start a server listening for connections.
   */
  public async listen(port: number, ...args: any[]) {
    if (this.http) {
      await this.http.listen(port, ...args);
      this.logger?.info(`Starts listening on port ${port}.`);
    }
  }

  /**
   * Returns http server instance.
   */
  public getHttpInstance(): any {
    return this.http?.getInstance();
  }
}
