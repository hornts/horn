export abstract class HttpAdapter {
  constructor(private readonly _server: any) {}

  public get server() {
    return this._server;
  }

  public async get(...args: any[]) {
    return this._server.get(args);
  }

  public async post(...args: any[]) {
    return this._server.post(args);
  }

  public async delete(...args: any[]) {
    return this._server.delete(args);
  }

  public async put(...args: any[]) {
    return this._server.put(args);
  }

  public async listen(...args: any[]) {
    return this._server.listen(...args);
  }
}
