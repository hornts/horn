export abstract class HttpAdapter {
  constructor(private readonly _instance: any) {}

  public getInstance(): any {
    return this._instance;
  }

  public async get(...args: any[]) {
    return this._instance.get(args);
  }

  public async post(...args: any[]) {
    return this._instance.post(args);
  }

  public async delete(...args: any[]) {
    return this._instance.delete(args);
  }

  public async put(...args: any[]) {
    return this._instance.put(args);
  }

  public async listen(...args: any[]) {
    return this._instance.listen(...args);
  }
}
