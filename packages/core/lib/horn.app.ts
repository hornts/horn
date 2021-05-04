import { Logger, Type } from '@hornts/common';

import { ApplicationContainer } from './di';
import { HttpAdapter } from './http';

export class HornApplication<T extends HttpAdapter> {
  private readonly _logger: Logger;

  private readonly _container: ApplicationContainer;

  private readonly _http: T;

  constructor(rootModule: Type<any>, httpAdapter: T) {
    this._logger = new Logger({
      name: 'Horn',
      prettyPrint: {
        colorize: true,
        ignore: 'pid,hostname,time',
      },
    });

    this._container = new ApplicationContainer(rootModule, this._logger);
    this._http = httpAdapter;

    this._container.initialize();
  }

  /**
   * Start a server listening for connections.
   */
  public listen(...args: any[]) {
    this._http.listen(...args);
  }

  /**
   * Returns http server instance.
   */
  public getHttpInstance(): any {
    return this._http.getInstance();
  }
}
