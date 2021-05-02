import { AppConfig } from '../config';
import { HttpAdapter } from '../http';

export class AppContainer {
  private _http: HttpAdapter;

  private modules = new Map();

  constructor(private readonly config?: AppConfig) {}

  public set http(adapter: HttpAdapter) {
    this._http = adapter;
  }

  public addModule(token: string, moduleRef) {
    if (this.modules.get(token)) {
      throw new Error('oops');
    }

    this.modules.set(token, moduleRef);
  }
}
