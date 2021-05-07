export class ModuleAlreadyExists extends Error {
  constructor(token: string) {
    super(`Module ${token} already exists.`);
  }
}
