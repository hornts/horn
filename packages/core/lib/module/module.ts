export class Module {
  private _controllers: Map<string, Record<string, unknown>>;

  get controllers() {
    return this._controllers;
  }

  constructor() {}
}
