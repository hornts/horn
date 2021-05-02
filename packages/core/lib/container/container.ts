import { AppConfig } from '../config';

export class AppContainer {
  private modules = new Map();

  constructor(private readonly config?: AppConfig) {}

  public addModule(moduleRef) {
    this.modules.set('Root', moduleRef);
  }
}
