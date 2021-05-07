export class ModuleAlreadyExistsError extends Error {
  constructor(token: string) {
    super(`Module ${token} already exists.`);
  }
}
