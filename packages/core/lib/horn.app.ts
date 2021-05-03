import { Type } from '@hornts/common';

import { ApplicationContainer } from './container';
import { HttpAdapter } from './http';

export class HornApplication<T extends HttpAdapter> {
  private container: ApplicationContainer;

  private _http: T;

  constructor(rootModule: Type<any>, httpAdapter: T) {
    this.container = new ApplicationContainer(rootModule);
    this._http = httpAdapter;

    this.container.load();
  }

  public listen(...args: any[]) {
    this._http.listen(...args);
  }

  /**
   * Returns http server instance
   */
  public getHttpInstance(): any {
    return this._http.getInstance();
  }
}
