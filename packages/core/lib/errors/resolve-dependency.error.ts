export class ResolveDependencyError extends Error {
  constructor(token: string, instance: string) {
    super(`Couldn't resolve dependency ${token} for ${instance}.`);
  }
}
