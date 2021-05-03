import { Type } from '@hornts/common';

import { AppContainer } from './container';
import { HttpAdapter } from './http';

export class HornApplication<T extends HttpAdapter> {
  private container: AppContainer;

  private _http: T;

  constructor(rootModule: Type<any>, httpAdapter: T) {
    this.container = new AppContainer(rootModule);
    this._http = httpAdapter;

    this.container.load();
  }

  public listen(...args: any[]) {
    this._http.listen(...args);
  }

  /**
   * Returns http server instance
   */
  public getHTTPInstance() {
    return this._http.getInstance();
  }
}
