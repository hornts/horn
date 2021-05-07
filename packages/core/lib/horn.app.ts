import { Logger, Type } from '@hornts/common';

import { ApplicationContainer } from './di';
import { HttpAdapter } from './http';

export interface HornOptions {
  /**
   * Determines whether the logger is on or off.
   * @default true
   */
  logger?: boolean;
}

export class HornApplication<T extends HttpAdapter> {
  private readonly _logger?: Logger;

  private readonly _container: ApplicationContainer;

  private readonly _http: T;

  constructor(rootModule: Type<any>, httpAdapter: T, options: HornOptions = { logger: true }) {
    if (options.logger) {
      this._logger = new Logger({
        name: 'Horn',
        prettyPrint: {
          colorize: true,
          ignore: 'pid,hostname,time',
        },
      });
    }

    this._container = new ApplicationContainer(rootModule, this._logger);
    this._http = httpAdapter;

    this._container.initialise();
  }

  /**
   * Start a server listening for connections.
   */
  public async listen(port: number, ...args: any[]) {
    await this._http.listen(port, ...args);

    this._logger?.info(`Started on port ${port}.`);
  }

  /**
   * Returns http server instance.
   */
  public getHttpInstance(): any {
    return this._http.getInstance();
  }
}
