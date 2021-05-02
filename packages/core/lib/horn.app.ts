import { AppContainer } from './container';

export class Horn {
  public static create(appModule) {
    const app = new AppContainer();

    app.addModule(appModule);

    return app;
  }
}
