import * as pino from 'pino';

export interface LoggerService {
  child(...args: any[]): any;
  fatal(...args: any[]);
  error(...args: any[]);
  warn(...args: any[]);
  info(...args: any[]);
  debug(...args: any[]);
  trace(...args: any[]);
}

export class Logger implements LoggerService {
  private readonly pino: pino.Logger;

  constructor(options?: pino.LoggerOptions) {
    this.pino = pino(options);
  }

  public child(options: pino.Bindings): pino.Logger {
    return this.pino.child(options);
  }

  public fatal(message: string) {
    this.pino.fatal(message);
  }

  public error(message: string) {
    this.pino.error(message);
  }

  public warn(message: string) {
    this.pino.warn(message);
  }

  public info(message: string) {
    this.pino.info(message);
  }

  public debug(message: string) {
    this.pino.debug(message);
  }

  public trace(message: string) {
    this.pino.trace(message);
  }
}
