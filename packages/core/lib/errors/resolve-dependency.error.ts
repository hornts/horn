export class ResolveDependencyError extends Error {
  constructor(dependency: string, injectable: string, module?: string) {
    super(
      `Couldn't resolve dependency ${dependency} for ${module ? `${module}:` : ''}${injectable}.`
    );
  }
}
