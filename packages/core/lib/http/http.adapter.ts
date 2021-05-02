export abstract class HttpAdapter {
  constructor(private readonly server: any) {}

  public async get(...args: any[]) {
    return this.server.get(args);
  }

  public async post(...args: any[]) {
    return this.server.post(args);
  }

  public async delete(...args: any[]) {
    return this.server.delete(args);
  }

  public async put(...args: any[]) {
    return this.server.put(args);
  }

  public async listen(...args: any[]) {
    return this.server.listen(args);
  }
}
