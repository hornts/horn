import { AppConfig } from '../config';

export class AppContainer {
  private modules = new Map();

  constructor(private readonly config?: AppConfig) {}

  public addModule(token: string, moduleRef) {
    if (this.modules.get(token)) {
      throw new Error('oops');
    }

    this.modules.set(token, moduleRef);
  }
}
