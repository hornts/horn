import { AppConfig } from '../config';

/**
 * Root DI Container
 */
export class AppContainer {
  private modules;

  constructor(private readonly config?: AppConfig) {}
}
