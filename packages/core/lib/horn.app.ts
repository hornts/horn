import { Type } from '@hornts/common';

import { AppContainer } from './container';
import { HttpAdapter } from './http';

export class HornApplication<T extends HttpAdapter> {
  private container: AppContainer;

  private _http: T;

  constructor(root: Type<any>, adapter: T) {
    this.container = new AppContainer(root);
    this._http = adapter;
  }

  public listen(port: number) {
    this._http.listen(port);
  }

  public get http() {
    return this._http;
  }
}
