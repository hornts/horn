export class ModuleAlreadyExistsError extends Error {
  constructor(readonly token: string) {
    super(`Module ${token} already exists.`);
  }
}
