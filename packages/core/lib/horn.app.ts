import { Logger, Type } from '@hornts/common';

import { ApplicationContainer } from './di';
import { HttpAdapter } from './http';

export interface HornOptions<T extends HttpAdapter> {
  /**
   * Logger instance used by Horn.
   * @default true
   *
   * @example <caption>Setting up custom logger:</caption>
   * import { LoggerService } from '@hornts/common';
   *
   * class CustomLogger implements LoggerService { ... }
   * logger: new CustomLogger()
   *
   * @example <caption>Disabling logger for Horn:</caption>
   * logger: false
   */
  logger?: boolean | Logger;

  /**
   * HTTP adapter used by Horn.
   *
   * @example <caption>Using official HTTP adapters:</caption>
   * import { ExpressAdapter } from '@hornts/http-express';
   * import { FastifyAdapter } from '@hornts/http-fastify';
   *
   * http: new ExpressAdapter();
   * http: new FastifyAdapter();
   *
   * @example <caption>Setting up custom HTTP adapter:</caption>
   * import { HttpAdapter } from '@hornts/core';
   *
   * class CustomAdapter extends HttpAdapter { ... };
   *
   * http: new CustomAdapter();
   */
  http?: T;
}

export class HornApplication<T extends HttpAdapter> {
  private readonly logger?: Logger;

  private readonly container: ApplicationContainer;

  private readonly http: T;

  constructor(rootModule: Type<any>, options?: HornOptions<T>) {
    if (options?.logger instanceof Logger) {
      this.logger = options.logger;
    } else if (options?.logger !== false) {
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
    this.registerControllers();
  }

  /**
   * Start a server listening for connections.
   */
  public async listen(port: number, ...args: any[]) {
    if (this.http) {
      await this.http.listen(port, ...args);
      this.logger?.info(`Starts listening on port ${port}...`);
    }
  }

  /**
   * Returns http server instance.
   */
  public getHttpInstance(): any {
    return this.http?.getInstance();
  }

  private registerControllers() {
    if (this.http) {
      const controllers = this.container.getControllers();
      for (let index = 0; index < controllers.length; index++) {
        const path = controllers[index].getPath();

        // TODO: load methods correctly
        this.http.get(path, (req, res) => {
          res.send('test');
        });

        this.logger?.info(`[HTTP Controller] ${controllers[index].getName()} registered.`);
      }
    }
  }
}
