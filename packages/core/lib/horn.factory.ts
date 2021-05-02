import { HornApplication } from './horn.app';
import { HttpAdapter } from './http';

export class HornFactory {
  public static create<T extends HttpAdapter>(appModule: any, adapter: T) {
    return new HornApplication(adapter);
  }
}
