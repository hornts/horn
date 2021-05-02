import { AppContainer } from './container';
import { HttpAdapter } from './http';

export class HornApplication<T extends HttpAdapter> {
  private container: AppContainer;

  private _http: T;

  constructor(adapter: T) {
    this._http = adapter;
    this.container = new AppContainer({});
  }

  public listen(port: number) {
    this._http.listen(port);
  }

  public get http() {
    return this._http;
  }
}
