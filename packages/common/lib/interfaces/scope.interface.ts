export enum Scope {
  /**
   * Singleton objects are the same for every request (created once).
   * @default
   */
  SINGLETON = 'singleton',

  /**
   * Transient objects are created for each injectable.
   * They creates once and they are different across each injectables.
   */
  TRANSIENT = 'transient',

  /**
   * Request objects created for each incoming request (dynamically)
   * and disposed after request completed.
   */
  REQUEST = 'request',
}
