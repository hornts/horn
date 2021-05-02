import { AppContainer } from './container';
import { HttpAdapter } from './http';

export class Horn {
  public static create<T extends HttpAdapter>(appModule: any, server: T) {
    const app = new AppContainer({ server });

    app.addModule('horn:root', appModule);

    return app;
  }
}
