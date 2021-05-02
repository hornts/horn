export enum Scope {
  /**
   * Singleton objects are the same for every request.
   * @default
   */
  SINGLETON = 'singleton',

  /**
   * Transient objects are always different.
   */
  TRANSIENT = 'transient',

  /**
   * Request objects are the same for each request but different across each request.
   */
  REQUEST = 'request',
}
